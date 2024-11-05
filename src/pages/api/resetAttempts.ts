import { resetFailedAttempts } from './signverificator';
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
    const body = await context.request.json();
    const username = body.username;
    
    await resetFailedAttempts(username);
    return new Response(JSON.stringify({ success: true }));
}