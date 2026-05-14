import {handler, startServer} from './dist/server/entry.mjs';
import http from 'node:http';

//Obterner la varibale de entorno o usar el 4321 por defecto
const PORT = process.env.PORT || 4321;
// Unir todas las interfaces (0.0.0.0) como requiere render
const HOST = '0.0.0.0';

//console.log(`Starting server on ${HOST}:${PORT}`);


// Usar el handler directamente con un servidor HTTP nativo
const server = http.createServer(handler);

// Manejar errores de servidor
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

// Iniciar el servidor
server.listen(PORT, HOST, () => {
  //console.log(`Server running at http://${HOST}:${PORT}/`);
});

// Manejar señales de terminación para cerrar limpiamente
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
