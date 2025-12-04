import type { APIRoute } from "astro";
import { turdb } from "../../../db/turso";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  // Validación simple del correo
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // Para errores, usamos new Response() con el código de estado apropiado.
    return new Response(JSON.stringify({ message: "Correo electrónico inválido." }), {
      status: 400,
    });
  }

  try {
    // Insertar el correo en la base de datos usando Turso
    await turdb.execute({
      sql: "INSERT INTO Subscriptions (email) VALUES (?)",
      args: [email],
    });

  } catch (error: any) {
    // Manejar el caso de que el correo ya exista (error de constraint UNIQUE)
    // El error de D1 (la DB subyacente) contiene este mensaje
    if (error?.message?.includes("UNIQUE constraint failed")) {
      return new Response(JSON.stringify({ message: "Este correo ya está suscrito." }), {
        status: 409, // 409 Conflict es un buen status code aquí
      });
    }

    // Manejar otros errores de la base de datos
    console.error("Error al suscribir:", error);
    return new Response("Ocurrió un error en el servidor.", { status: 500 });
  }

  // Redirigir a la home con un mensaje de éxito.
  // El código 303 See Other es apropiado después de un POST exitoso.
  return redirect("/?message=subscribed_successfully", 303);
};
