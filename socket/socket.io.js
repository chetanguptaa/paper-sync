const socketIO = require('socket.io');
const log = require('../utils/logger');
const Document = require('../models/documentModel');

module.exports = (server) => {
    const io = socketIO(server);
    const connectedClients = new Map();

    io.on('connection', (socket) => {

        log.info('New client connected:', socket.id);

        socket.on('joinDocument', async (title, username) => {
            connectedClients.set(socket.id, { title, username });
            log.info(`${username} joined document: ${title}`);
            
            try {
                const document = await Document.findOne({ title });
                if(document && !document.collaborators.includes(username)) {
                    document.collaborators.push(username);
                    await document.save();
                }
                io.emit('documentUpdated', document);
            } catch (error) {
                log.error('Error adding collaborators to the document: ', error);
            }
        });

        socket.on('disconnect', () => {
            const { title, username } = connectedClients.get(socket.id);
            if(title && username) {
                connectedClients.delete(socket.id);
                log.info('Client disconnected:', socket.id);
            } 
        });

        socket.on('documentUpdate', (data) => {
            const { title } = connectedClients.get(socket.id);
            if (title) {
                socket.to(title).emit('documentUpdate', data);
            }
        });
        
        socket.on('cursorUpdate', (data) => {
            const { title } = connectedClients.get(socket.id);
            if (title) {
                socket.to(title).emit('cursorUpdate', data);
            }
        });
    });
};