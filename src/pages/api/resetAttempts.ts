import { resetFailedAttempts } from './signverificator';
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
    const body = await context.request.json();//
    const username = body.username;
    
    await resetFailedAttempts(username);//poner en 0 los intentos fallidos
    return new Response(JSON.stringify({ success: true }));
}