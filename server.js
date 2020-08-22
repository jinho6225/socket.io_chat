const app = require('express')();
const express = require('express');
const { disconnect } = require('process');
const http = require('http').createServer(app);
const PORT = 3000
const io = require('socket.io')(http);


app.use(express.static('public'))

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});