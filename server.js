'use strict';
const Globals = require('./server-variables');
const app = require('http').createServer()
const io = require('socket.io')(app);
const fs = require('fs');
const Heartbeat = require('./server-heartbeat')(io);

app.listen(1338);

io.on('connection', function (socket) {
  const _players = Object.keys(Globals.players).map(key => Globals.players[key]);
  socket.emit('PLAYERS_LIST', _players);
  socket.emit('HALLOFFAME_UPDATE', Globals.hallOfFame);

  socket.on('CHAT_MESSAGE_OUT', function (message) {
    if(!Globals.players[socket.id]) return;

    io.emit('CHAT_MESSAGE_IN', {
      username: Globals.players[socket.id].username,
      body: message.body
    });
  });

  socket.on('USER_LOGIN', function(userdata) {
    Globals.visits++;

    Globals.players[socket.id] = {
      id: Globals.visits,
      username: userdata.username,
      pot: 1500,
      rounds: 0,
      socket: socket.id
    };

    socket.emit('USER_LOGGED_IN', Globals.players[socket.id]);
    socket.emit('BANK_UPDATE', { bank: Globals.bank, pot: Globals.players[socket.id].pot });

    io.emit('PLAYER_JOIN', Globals.players[socket.id]);

    io.emit('CHAT_MESSAGE_IN', {
      username: 'Croupier',
      sys: true,
      body: `Say "hi!" to ${Globals.players[socket.id].username}`
    });
  });

  socket.on('DICE_BET', function(bet) {
    if(!Globals.players[socket.id]) return;

    Globals.bets[socket.id] = bet.diceValue;
    Globals.players[socket.id].rounds = Globals.players[socket.id].rounds + 1;

    io.emit('CHAT_MESSAGE_IN', {
      username: 'Croupier',
      sys: true,
      body: `${Globals.players[socket.id].username} bets at ${bet.diceValue}!`
    });

    Globals.bank = Globals.bank + 100;
    Globals.players[socket.id].pot = Globals.players[socket.id].pot - 100;

    io.emit('BANK_UPDATE', {
      bank: Globals.bank,
      pot: Globals.players[socket.id].pot
    });
  });


  socket.on('disconnect', function() {
    if(!Globals.players[socket.id]) return;

    io.emit('CHAT_MESSAGE_IN', {
      username: 'Croupier',
      sys: true,
      body: `${Globals.players[socket.id].username} left us...`
    });

    Globals.players[socket.id] = null;
    delete Globals.players[socket.id];

    const _players = Object.keys(Globals.players).map(key => Globals.players[key]);
    io.emit('PLAYERS_LIST', _players);
  });
});
