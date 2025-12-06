import { lucia } from "@/auth/auth";
import type { APIContext } from "astro";
// import { db, eq, User } from "astro:db";
import { checkAccountLocked, resetFailedAttempts, incrementFailedAttempts } from "./signverificator";
import { Argon2id } from "oslo/password";
import { turdb } from "../../../db/turso";

export async function POST(context: APIContext):Promise<Response>{

    //Leer la data del form
    const formData = await context.request.formData();
    const usernameInput = formData.get("username")
    const username = typeof usernameInput === 'string' ? usernameInput : '';
    const password = formData.get("password");
    
    //Validar si la cuenta esta bloqueada
    const { isLocked, remainingTime, permanentLock } = await checkAccountLocked(username);
    if (permanentLock) {
        return context.redirect(`/signin?error=permanent_lock`);
    }
    
    if (isLocked) {
        const remainingSeconds = Math.ceil(remainingTime / 1000);
        const currentTime = Date.now();
        const unlockTime = currentTime + remainingTime;
        return context.redirect(`/signin?error=account_locked&remainingTime=${remainingSeconds}&unlockTime=${unlockTime}`);
    }

    //Validar los datos
    if(typeof username !=='string'){
        return new Response("El Usuario o el Password Incorrecto ", {status:400})
    }

    if(typeof password !=='string'){
        return new Response("El Usuario o el Password es Incorrecto ", {status:400})
    }
    
    //Buscar el usuario en la bd
    //const foundUser = (await db.select().from(User).where(eq(User.username, username))).at(0) //compara el User.username con el usuario que han enviado
    const { rows: [foundUser] } = await turdb.execute({
        sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
        args: [username]

        /** - Usamos turdb.execute() para hacer consultas SQL directas
            - rows: [foundUser] desestructura directamente el primer resultado
            - LIMIT 1 asegura que solo obtenemos un usuario
            - El objeto foundUser mantiene la misma estructura con las propiedades id, username, password, etc. */
    })

    //Si el usuario no existe
    if(!foundUser){
        //return context.redirect("/signin?error=user_not_found");
        //✅ Incrementar intentos fallidos por usuario existente
        await incrementFailedAttempts(username);
        return context.redirect("/signin?error=user_not_found");
    }
    //verificar el usuario tiene password
    if(!foundUser.password){
        //return new Response("El Usuario o el Password es Incorrecto", {status:400})
        //✅ Incrementar intentos fallidos por falta de password
        await incrementFailedAttempts(username);
        return new Response("User or Password is Incorrect", {status:400})
    }


    //Comparar el password hash
    const valiPassword = await new Argon2id().verify(
        String(foundUser.password), 
        String(password)
    )

    //si el password no es valido
    if(!valiPassword){
        await incrementFailedAttempts(username);
        return context.redirect("/signin?error=invalid_password");
    }
    
    //✅ Login exitoso - resetear intentos fallidos
    await resetFailedAttempts(username);

    //El password es valido, el usuario se puede logear
    const session = await lucia.createSession(String(foundUser.id), {});//Creasesión de usuario
    const sessionCookie = lucia.createSessionCookie(session.id)//Crea una cookie de sesión
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,{
            ...sessionCookie.attributes,
            path: sessionCookie.attributes.path ?? "/",
            sameSite: sessionCookie.attributes.sameSite ?? "lax",

        }
    ) //Establece la cookie en la respuesta
    return context.redirect("/") //Redirige al usuario a la página de inicio

}