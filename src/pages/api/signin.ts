import { lucia } from "@/auth/auth";
import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { checkAccountLocked, incrementFailedAttempts, resetFailedAttempts } from "./signverificator";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext):Promise<Response>{

    //Leer la data del form
    const formData = await context.request.formData();
    const usernameInput = formData.get("username")
    const username = typeof usernameInput === 'string' ? usernameInput : '';
    const password = formData.get("password");
    
    //Validar si la cuenta esta bloqueada
    const { isLocked, remainingTime, permanentLock } = await checkAccountLocked(username);
    if (permanentLock) {
        return context.redirect(`/signin?error=permanent_lock&username=${encodeURIComponent(username)}`);
    }
    
    if (isLocked) {
        const remainingSeconds = Math.ceil(remainingTime / 1000);
        const currentTime = Date.now();
        const unlockTime = currentTime + remainingTime;
        return context.redirect(`/signin?error=account_locked&remainingTime=${remainingSeconds}&unlockTime=${unlockTime}&username=${encodeURIComponent(username)}`);
    }

    //Validar los datos
    if(typeof username !=='string'){
        return new Response("El Usuario o el Password Incorrecto ", {status:400})
    }

    if(typeof password !=='string'){
        return new Response("El Usuario o el Password es Incorrecto ", {status:400})
    }

    //Buscar el usuario en la bd
    const foundUser = (await db.select().from(User).where(eq(User.username, username))).at(0) //compara el User.username con el usuario que han enviado

    //Si el usuario no existe
    if(!foundUser){
        return context.redirect("/signin?error=user_not_found");
    }
    //verificar el usuario tiene password
    if(!foundUser.password){
        return new Response("El Usuario o el Password es Incorrecto", {status:400})
    }


    //Comparar el password hash
    const valiPassword = await new Argon2id().verify(
        foundUser.password, 
        password
    )

    //si el password no es valido
    if(!valiPassword){
        return context.redirect("/signin?error=invalid_password&username=" + encodeURIComponent(username));    }

    

    await resetFailedAttempts(username);

    //El password es valido, el usuario se puede logear
    const session = await lucia.createSession(foundUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
    return context.redirect("/home")

}