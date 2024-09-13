const socketIo = require('socket.io');

let io = null;

function setupSocketIo(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['authorization'],
      credentials: true
    }
  });

  io.use(verifySocketToken);

  io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

function emitEvent(event) {
  io.emit('event', event);
}

const verifySocketToken = (socket, next) => {
  const token = socket.handshake.query.token;
  
  if (token !== process.env.SOCKET_TOKEN) {
    return next(new Error('Authentication error'));
  }
  
  next();
};

module.exports = { setupSocketIo, emitEvent };
