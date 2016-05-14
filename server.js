var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(1337);

io.on('connection', function (socket) {
  socket.on('CHAT_MESSAGE_OUT', function (message) {
    io.emit('CHAT_MESSAGE_IN', { body: message.body });
  });
});
