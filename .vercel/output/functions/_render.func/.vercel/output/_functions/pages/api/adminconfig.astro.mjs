import { d as db, A as Admin } from '../../chunks/_astro_db_B32vqkck.mjs';
export { renderers } from '../../renderers.mjs';

const cl = console.log.bind(console);
async function GET() {
  const adminUsers = await db.select().from(Admin);
  cl("Admin users form DB:", adminUsers);
  return new Response(JSON.stringify(adminUsers.map((user) => user.username)));
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
