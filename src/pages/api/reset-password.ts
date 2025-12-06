import type { APIContext } from "astro";
import { turdb } from "../../../db/turso";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const token = formData.get("token");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    // 1. Validar el token
    if (typeof token !== "string" || token.length === 0) {
        return new Response("Token inválido", { status: 400 });
    }

    if (password !== confirmPassword) {
        return context.redirect(`/reset-password?token=${token}&error=password_mismatch`);
    }
    if (typeof password !== "string" || password.length < 6) {
        return context.redirect(`/reset-password?token=${token}&error=password_too_short`);
    }

    // 3. Validar el token contra la base de datos
    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
    
    const tx = await turdb.transaction();
    try {
        const { rows: [tokenEntry] } = await tx.execute({
            sql: "SELECT user_id, expires_at FROM PasswordResetToken WHERE token_hash = ?",
            args: [tokenHash],
        });

        if (!tokenEntry) {
            await tx.rollback();
            return context.redirect(`/forgot-password?error=` + encodeURIComponent("El enlace es inválido o ya fue utilizado."));
        }

        const expiresAt = new Date(tokenEntry.expires_at as string).getTime();
        if (Date.now() > expiresAt) {
            await tx.rollback();
            return context.redirect(`/forgot-password?error=` + encodeURIComponent("El enlace ha expirado. Por favor, solicita uno nuevo."));
        }

        // 3. Invalidar todos los tokens para ese usuario (incluido el actual)
        await tx.execute({
            sql: "DELETE FROM PasswordResetToken WHERE user_id = ?",
            args: [tokenEntry.user_id],
        });

        // 4. Hashear y actualizar la nueva contraseña
        const hashedPassword = await new Argon2id().hash(password);
        await tx.execute({
            sql: "UPDATE User SET password = ? WHERE id = ?",
            args: [hashedPassword, tokenEntry.user_id],
        });

        await tx.commit();

    } catch (error) {
        await tx.rollback();
        console.error("Error al restablecer la contraseña:", error);
        return context.redirect(`/forgot-password?error=` + encodeURIComponent("Ocurrió un error en el servidor."));
    }

    // 5. Redirigir al login con mensaje de éxito
    return context.redirect("/signin?message=password_reset_success");
}
