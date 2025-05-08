const port = process.env.PORT || 4321;
const host = '0.0.0.0';

import( './dist/server/entry.mjs').then(({start}) => {
    start(host, port)
});