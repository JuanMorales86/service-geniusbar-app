//Proceso de Registro
import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from 'oslo/password';
// import { db, eq, User } from "astro:db";
import { lucia } from "@/auth/auth";
import { turdb } from "../../../db/turso";
const cl = console.log.bind(console);

// async function storeSessionData(session: any) {
//     const sessionids = generateId(32);//genera un id del usuario
//       //Almacenar la session en la base de datos Turso
//       await turdb.execute({
//         sql: "INSERT INTO Session ( id, user_id, expires_at) VALUES (?, ?, ?)",
//         args: [ sessionids, session.userId, session.expiresAt]
//     })
// }

export async function POST(context:APIContext) : Promise<Response> {
    //Primero leer los datos del form
    const formData = await context.request.formData();
    const usernameInput = formData.get("username");
    const username = typeof usernameInput === 'string' ? usernameInput : '';
    const password = formData.get("password");
    const adminCode = formData.get("adminCode");

    const {ADMIN_USER_LEVEL, ADMIN_USERNAMES } = import.meta.env;
    const adminUsers = String(ADMIN_USERNAMES);
    const adminUserLevel = String(ADMIN_USER_LEVEL);

    const adminUsernames = adminUsers?.split(',') || [];
    const isAdminUsername = adminUsernames.includes(username);
    const hasValidAdminCode = adminCode === adminUserLevel;

    const isAdmin = isAdminUsername && hasValidAdminCode;
    
    try{
        //Flujo de validacion
        //Verificar si el usuario ya existe
        //const existingUser = await db.select().from(User).where(eq(User.username, username));// existingUser es un array que contiene los resultados de la consulta a la base de datos
        //Checks if User exists - Turso Version
        const { rows: existingUser } = await turdb.execute({
            sql: "SELECT * FROM User WHERE username = ?", 
            args: [username]
        });
        if (existingUser.length > 0) {// length > 0 significa que se encontró al menos un usuario con ese nombre. Si es mayor que 0, significa que ya existe un usuario con ese nombre
            return context.redirect("/signup?error=user_exists&message=" + encodeURIComponent("Este usuario ya existe")); 

            /** 
            Redirige al usuario de vuelta al formulario de registro.
            Añade parámetros en la URL:
                > error=user_exists: identificador del tipo de error.
                > message=: el mensaje que se mostrará al usuario.
            encodeURIComponent(): función que codifica el texto para que sea seguro usarlo en URLs. */
        }

    //Validar los datos
    if (!username || !password){
        return context.redirect("/signup?error=invalid_input&message=" + encodeURIComponent("Usuario o Contraseña incorrectos"));
    }
    
    if( typeof username !== 'string' || username.length < 4){
        // return new Response("El Usuario debe contener al menos 4 caracteres de longitud ", {status:400})
        return context.redirect("/signup?error=invalid_username&message=" + encodeURIComponent("Usuario debe contener al menos 4 caracteres de longitud"));
    }
    
    if( typeof password !== 'string' || password.length < 4){
        // return new Response("La Contraseña debe contener al menos 4 caracteres de longitud ", {status:400})
        return context.redirect("/signup?error=invalid_password&message=" + encodeURIComponent("La Contraseña debe contener al menos 4 caracteres de longitud"));
    }
    

    
    //Insertar el usuario en la base de datos (creacion del usurio)
    const userId = generateId(15);//genera un id del usuario
    const hashedPassword = await new Argon2id().hash(password);//el await es por q devuelve una promesa es el hash de su contrasena
    
    // await db.insert(User).values([
    //     {
    //         id: userId,
    //         username,
    //         password: hashedPassword,
    //         github_id: null,
    //         isAdmin: isAdmin,
    //     },
    // ])

    await turdb.execute({
        sql: "INSERT INTO User (id, username, password, github_id, isAdmin) VALUES ( ?, ? , ?, ? , ? )",
        args: [userId, username, hashedPassword, null, isAdmin]
    })
    //cl('User created successfully:', userId);
    //Crear sesion de usuario 
    
    
    
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

    //await storeSessionData(session)

    
    return context.redirect("/serviciosm")//Redirige a la pagina 
    //Manejo de errores
} catch(error) {
    console.error("Error durante el registro:", error);
    return context.redirect("/signup?error=server_error&message=" + encodeURIComponent("Error en el servidor"));
    
}

}

//Redirige las peticionoes GET de vuelta a la pagina de registro
export async function GET(): Promise<Response> {
    return new Response(null, {
        status: 307,
        headers: { Location: '/signup' }
    });
}