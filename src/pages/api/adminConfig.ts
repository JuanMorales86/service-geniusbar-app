import { turdb } from "../../../db/turso";
const cl = console.log.bind(console);

export async function GET() {
    const { rows: adminUsers} = await turdb.execute(
        `SELECT * FROM admin`
    )

    //const {rows: tableinfo } = await turdb.execute( `PRAGMA table_info(Session)`);
    const {rows: content} = await turdb.execute(`SELECT * FROM Session`);
    //cl('INFORMACION de la tabla Session', content);
    //cl('Admin users from DB:', adminUsers);
    return new Response(JSON.stringify(adminUsers.map(user => user.username)))
}

