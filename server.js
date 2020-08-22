const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 3000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

// Code below for connection
let count = 1;
io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);
  let name = '익명' + count++;
  socket.name = name;

  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send msg', ({ message, nick }) => {
    if (!nick) {
      nick = socket.name  
    }
    io.emit('rcvd msg', { message, nick });
  });

})