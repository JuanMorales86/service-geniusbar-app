import type { APIContext } from "astro";
import { turdb } from "../../../db/turso";
import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { Resend } from "resend";

// Asegúrate de tener esta variable en tu entorno (.env)
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const username = formData.get("username");

    if (typeof username !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
        return context.redirect("/forgot-password?error=" + encodeURIComponent("Correo electrónico inválido."));
    }

    // 1. Buscar al usuario
    const { rows: [user] } = await turdb.execute({
        sql: "SELECT id FROM User WHERE username = ?",
        args: [username]
    });
    const successMessage = "Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.";
    // Por seguridad, no revelamos si el usuario existe o no.
    // Siempre mostramos un mensaje de éxito.
    if (!user) {
        return context.redirect("/forgot-password?message=" + encodeURIComponent(successMessage));
    }

    // 2. Invalidar tokens antiguos para este usuario
    await turdb.execute({
        sql: "DELETE FROM PasswordResetToken WHERE user_id = ?",
        args: [user.id]
    });

    // 3. Generar nuevo token
    const token = generateId(40); // Token seguro de 40 caracteres
    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
    const expiresAt = createDate(new TimeSpan(15, "m")); // El token expira en 15 minutos

    await turdb.execute({
        sql: "INSERT INTO PasswordResetToken (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
        args: [user.id, tokenHash, expiresAt]
    });

    // 4. Construir el enlace y enviar el correo
    const resetLink = `${context.url.origin}/reset-password?token=${token}`;

    try {
        await resend.emails.send({
            from: import.meta.env.RESEND_FROM_EMAIL,
            to: username,
            subject: 'Restablece tu contraseña en OnthePointService',
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; text-align: center; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                    <img src="https://onthepointservice.com/img/onthepointservice.png" alt="Logo de OnthePointService" style="max-width: 150px; margin-bottom: 20px;">
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px;">
                        <h1 style="color: #333; font-size: 24px;">Restablecer Contraseña</h1>
                        <p style="color: #555;">Hola,</p>
                        <p style="color: #555;">Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente botón para continuar:</p>
                        <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 12px 25px; background-color: #0ea5e9; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer mi contraseña</a>
                        <p style="color: #777; font-size: 14px;">Este enlace expirará en 15 minutos.</p>
                        <p style="color: #777; font-size: 14px;">Si no solicitaste esto, puedes ignorar este correo de forma segura.</p>
                    </div>
                </div>
            `
        });
    } catch (error) {
        console.error("Error al enviar email:", error);
        // Incluso si el email falla, no se lo decimos al usuario por seguridad.
        // Podrías añadir un log más robusto aquí.
    }

    return context.redirect("/forgot-password?message=" + encodeURIComponent(successMessage));
}
