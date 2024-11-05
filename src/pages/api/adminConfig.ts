import { db, Admin } from "astro:db";
const cl = console.log.bind(console);

export async function GET() {
    const adminUsers = await db.select().from(Admin);
    cl('Admin users form DB:', adminUsers);
    return new Response(JSON.stringify(adminUsers.map(user => user.username)))
}