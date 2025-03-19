import { t as turdb } from '../../chunks/turso_CdaR7E3F.mjs';
export { renderers } from '../../renderers.mjs';

const cl = console.log.bind(console);
async function GET() {
  const { rows: adminUsers } = await turdb.execute(
    `SELECT * FROM admin`
  );
  const { rows: content } = await turdb.execute(`SELECT * FROM Session`);
  cl("INFORMACION de la tabla Session", content);
  cl("Admin users from DB:", adminUsers);
  return new Response(JSON.stringify(adminUsers.map((user) => user.username)));
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
