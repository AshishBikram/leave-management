const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3200;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('notification', (notification) => {
    console.log(notification);
    io.emit('notification', notification);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
