const socketIO = require('socket.io');
const log = require('../utils/logger');

// Export a function that takes the server as an argument
module.exports = (server) => {
    const io = socketIO(server);
    const connectedClients = new Map();

    io.on('connection', (socket) => {

        log.info('New client connected:', socket.id);

        socket.on('joinDocument', (title) => {
            connectedClients.set(socket.id, title);
            log.info('Client joined document:', title);
        });

        socket.on('disconnect', () => {
            const documentTitle = connectedClients.get(socket.id);
            if (documentTitle) {
                connectedClients.delete(socket.id);
                log.info('Client disconnected:', socket.id);
            }
        });

        socket.on('documentUpdate', (data) => {
            const documentTitle = connectedClients.get(socket.id);
            if (documentTitle) {
                socket.to(documentTitle).emit('documentUpdate', data);
            }
        });
        
        socket.on('cursorUpdate', (data) => {
            const documentTitle = connectedClients.get(socket.id);
            if (documentTitle) {
                socket.to(documentTitle).emit('cursorUpdate', data);
            }
        });
    });
};