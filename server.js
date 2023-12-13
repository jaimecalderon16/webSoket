const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de rutas estáticas (puedes agregar más adelante)
app.use(express.static(__dirname + '/public'));

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Manejar eventos aquí...
  socket.on('mensaje', (mensaje) => {
    console.log('Mensaje recibido:', mensaje);
    // Enviar el mensaje a todos los clientes conectados
    io.emit('mensaje', mensaje);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
