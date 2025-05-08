const port = process.env.PORT || 4321;
const host = '0.0.0.0';

import('./dist/server/entry.mjs').then((server) => {
    if(typeof server.default === 'function'){
        server.default({port, host});
    } else {
        console.error('[❌] No se encontró una función exportada en entry.mjs');
    }
});