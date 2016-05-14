'use strict';
const app = require('http').createServer()
const io = require('socket.io')(app);
const fs = require('fs');

const players = {};
let visits = 0;

app.listen(1337);

io.on('connection', function (socket) {
  const _players = Object.keys(players).map(key => obj[key]);

  socket.emit('PLAYERS_LIST', _players);

  socket.on('CHAT_MESSAGE_OUT', function (message) {
    io.emit('CHAT_MESSAGE_IN', { body: message.body });
  });

  socket.on('disconnect', function() {
    if(players[socket.id]) {
      io.emit('PLAYER_LEAVE', {
        id: players[socket.id].id
      });
    }
  });

  socket.on('USER_LOGIN', function(userdata) {
    visits++;

    players[socket.id] = {
      id: visits,
      username: userdata.username,
      score: 1000
    };

    io.emit('PLAYER_JOIN', players[socket.id]);
  });
});
