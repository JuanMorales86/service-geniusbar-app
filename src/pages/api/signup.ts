//Proceso de Registro
import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from 'oslo/password'
import { db, User } from "astro:db";
import { lucia } from "@/auth/auth";

export async function POST(context:APIContext) : Promise<Response> {
    //Primero leer los datos del form
    const formData = await context.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    //Validar los datos
    if (!username || !password){
        return new Response("Usuario o Contraseña incorrectos", {status:400})
    }

    if( typeof username !== 'string' || username.length < 4){
        return new Response("El Usuario debe contener al menos 4 caracteres de longitud ", {status:400})
    }

    if( typeof password !== 'string' || password.length < 4){
        return new Response("La Contraseña debe contener al menos 4 caracteres de longitud ", {status:400})
    }

    //Insertar el usuario en la base de datos

    const userId = generateId(15);//genera un id del usuario
    const hashedPassword = await new Argon2id().hash(password);//el await es por q devuelve una promesa es el hash de su contrasena

    await db.insert(User).values([
        {
            id: userId,
            username,
            password: hashedPassword,
        },
    ])

    //generar session
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return context.redirect("/")
}