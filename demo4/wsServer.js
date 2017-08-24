var app = require('http').createServer()
var io = require('socket.io')(app);    //封装app对象

app.listen(3000);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});