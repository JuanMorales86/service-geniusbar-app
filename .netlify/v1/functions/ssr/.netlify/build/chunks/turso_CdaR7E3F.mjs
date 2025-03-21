import { createClient } from '@libsql/client/web';

const turdb = createClient({
  url: "libsql://service-geniusbar-app-juandev.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQwMzczOTUsImlkIjoiYzVmZjQyMjItMTY3YS00Njc3LTgwNTctNjg4MzliYjc3NDE5In0.FnLC-MkEfNdvKzrllUqWKnhrIxbMVZPTIERNZgN64xl42nnI2djpUKNMGB-hz8sTjOgURlPkmeOOWo_z7wbUAw"
});

export { turdb as t };
