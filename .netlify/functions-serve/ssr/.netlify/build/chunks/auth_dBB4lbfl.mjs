import { Lucia } from 'lucia';
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite';
import { Google, GitHub } from 'arctic';
import { t as turdb } from './turso_CdaR7E3F.mjs';

const adapter = new LibSQLAdapter(
  turdb,
  {
    user: "User",
    session: "Session"
  }
);
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
const googleCallbackURL = "https://yourdomain.com/api/callbacks/google" ;
const google = new Google(
  "971859132787-s2ee202bc3qr56ovtp7q65hadeoirjum.apps.googleusercontent.com",
  "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",
  googleCallbackURL
  //Direct string
);
const githubCallbackURL = "https://yourdomain.com/api/callbacks/github" ;
const github = new GitHub(
  "02c8fe8e9ba8ed58f6bc",
  "aa9809a17b13ef0edad878ea33b5a0f90d31f3db",
  { redirectURI: githubCallbackURL }
  // Object with string r1edirectURI
);

export { google as a, github as g, lucia as l };
