import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { d as db, a as Session, U as User } from './_astro_db_B32vqkck.mjs';
import { GitHub } from 'arctic';

const adapter = new DrizzleSQLiteAdapter(db, Session, User);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS (ahora como lo corro en pnpm run dev es false PROD y se ejecuta en HTTP que es localhost cuando se ejecute en pnp run start se debe cambiar a true)
      secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      username: attributes.username,
      isAdmin: attributes.isAdmin
    };
  }
});
const github = new GitHub(
  "02c8fe8e9ba8ed58f6bc",
  "aa9809a17b13ef0edad878ea33b5a0f90d31f3db"
);

export { github as g, lucia as l };
