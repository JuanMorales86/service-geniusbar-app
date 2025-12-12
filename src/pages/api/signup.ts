//Proceso de Registro
import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from 'oslo/password';
// import { db, eq, User } from "astro:db";
import { lucia } from "@/auth/auth";
import { turdb } from "../../../db/turso";
const cl = console.log.bind(console);

export async function POST(context:APIContext) : Promise<Response> {
    //Primero leer los datos del form
    const formData = await context.request.formData();
    const usernameInput = formData.get("username");
    const username = typeof usernameInput === 'string' ? usernameInput : '';
    const password = formData.get("password");
    const adminCode = formData.get("adminCode");

    // --- Lógica de Administrador Refinada ---
    const adminUsernames = (import.meta.env.ADMIN_USERNAMES ?? "").split(',');
    const isAdminUsername = adminUsernames.includes(username);
    let isAdmin = false;
    
    try{
        // --- Validaciones ---

        // 1. Validar formato de email (excepto para usuarios admin que no son email)
        if (!isAdminUsername && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            return context.redirect("/signup?error=invalid_email&message=" + encodeURIComponent("Por favor, introduce un correo electrónico válido."));
        }

        // 2. Verificar si el usuario ya existe
        const { rows: existingUser } = await turdb.execute({
            sql: "SELECT * FROM User WHERE username = ?", 
            args: [username]
        });
        if (existingUser.length > 0) {// length > 0 significa que se encontró al menos un usuario con ese nombre. Si es mayor que 0, significa que ya existe un usuario con ese nombre
            return context.redirect("/signup?error=user_exists&message=" + encodeURIComponent("Este usuario ya existe.")); 
        }

    //Validar los datos
    if (!username || !password){
        return context.redirect("/signup?error=invalid_input&message=" + encodeURIComponent("Usuario o Contraseña incorrectos."));
    }
    
    if( typeof username !== 'string' || username.length < 4){
        return context.redirect("/signup?error=invalid_username&message=" + encodeURIComponent("El usuario debe contener al menos 4 caracteres."));
    }
    
    if( typeof password !== 'string' || password.length < 4){
        return context.redirect("/signup?error=invalid_password&message=" + encodeURIComponent("La contraseña debe contener al menos 4 caracteres."));
    }
    
    // 3. Validar rol de administrador
    if (isAdminUsername) {
        if (adminCode === import.meta.env.ADMIN_USER_LEVEL) {
            isAdmin = true;
        } else {
            // El usuario es un admin pero el código es incorrecto
            return context.redirect("/signup?error=invalid_admin_code&message=" + encodeURIComponent("El código de administrador es incorrecto."));
        }
    }

    //Insertar el usuario en la base de datos (creacion del usurio)
    const userId = generateId(15);//genera un id del usuario
    const hashedPassword = await new Argon2id().hash(password);//el await es por q devuelve una promesa es el hash de su contrasena
    
    await turdb.execute({
        sql: "INSERT INTO User (id, username, password, github_id, isAdmin) VALUES ( ?, ? , ?, ? , ? )",
        args: [userId, username, hashedPassword, null, isAdmin]
    })
    
    //generar cookie de session (gestion de sesiones)
    const session = await lucia.createSession(userId, {});//Crear session
    const sessionCookie = lucia.createSessionCookie(session.id);//Setear la cookie de sesion
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value, {
            ...sessionCookie.attributes,
            path: sessionCookie.attributes.path ?? "/",
            sameSite: sessionCookie.attributes.sameSite ?? "lax",
        }
    )

    return context.redirect(isAdmin ? "/dashboard" : "/serviciosm")//Redirige a la pagina 
    //Manejo de errores
} catch(error) {
    console.error("Error durante el registro:", error);
    return context.redirect("/signup?error=server_error&message=" + encodeURIComponent("Error en el servidor."));
    
}

}

//Redirige las peticionoes GET de vuelta a la pagina de registro
export async function GET(): Promise<Response> {
    return new Response(null, {
        status: 307,
        headers: { Location: '/signup' }
    });
}