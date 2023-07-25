const express = require('express');
const config = require('config');
const http = require('http');
const log = require('./utils/logger');
const { connect } = require('./utils/connect');
const userRouter = require('./routes/userRoutes');
const documentRouter = require('./routes/documentRoutes');
const socketSetup = require('./socket/socket.io.js');
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(documentRouter);

app.get('', (req, res) => {
  res.sendFile(__dirname + '/clientTemp/testWebSocket.html');
});

const server = http.createServer(app);

socketSetup(server);

const PORT = config.get("port");

server.listen(PORT, async () => {
  await connect();
  log.info(`app is listening on port ${PORT}`);
})