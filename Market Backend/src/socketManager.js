const socketio = require('socket.io');

let io;

// Function to initialize Socket.io and return the 'io' instance
function initializeSocket(server) {
  io = socketio(server, {
    cors: {
        origin: ['http://localhost:4200']
    }
  });

  // Handle Socket.io connection event
  io.on('connection', (socket) => {
    console.log('Client connected');

    // Handle disconnection event (optional)
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

function getIO() {
    if (!io) {
      throw new Error('Socket.io has not been initialized.');
    }
    return io;
}

module.exports = {
  initializeSocket,
  getIO
};