var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

const players = [{

}];

app.listen(1337);

io.on('connection', function (socket) {
  socket.on('CHAT_MESSAGE_OUT', function (message) {
    io.emit('CHAT_MESSAGE_IN', { body: message.body });
  });

  socket.on('USERDATA_OUT', function (userdata) {
    io.emit('PLAYER_JOIN', { player_id: 1, nickname: 'John' });
  });

  socket.on('disconnect', function() {
    io.emit('PLAYER_LEAVE', { player_id: 1 });
  });
});
