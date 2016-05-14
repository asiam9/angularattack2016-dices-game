'use strict';
const Globals = require('./server-variables');
const app = require('http').createServer()
const io = require('socket.io')(app);
const fs = require('fs');
const Heartbeat = require('./server-heartbeat')(io);

app.listen(1337);

io.on('connection', function (socket) {
  const _players = Object.keys(Globals.players).map(key => Globals.players[key]);

  socket.emit('PLAYERS_LIST', _players);

  socket.on('CHAT_MESSAGE_OUT', function (message) {
    io.emit('CHAT_MESSAGE_IN', { body: message.body });
  });

  socket.on('disconnect', function() {
    if(Globals.players[socket.id]) {
      io.emit('PLAYER_LEAVE', {
        id: Globals.players[socket.id].id
      });
    }
  });

  socket.on('USER_LOGIN', function(userdata) {
    Globals.visits++;

    Globals.players[socket.id] = {
      id: Globals.visits,
      username: userdata.username,
      score: 1000,
      socket: socket.id
    };

    io.emit('PLAYER_JOIN', Globals.players[socket.id]);
  });

  socket.on('DICE_BET', function(bet) {
    Globals.bets[socket.id] = bet.diceValue;
  });
});

