const app = require('express')();
const express = require('express');
const { disconnect } = require('process');
const http = require('http').createServer(app);
const PORT = 3000
const io = require('socket.io')(http);


app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});


http.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});