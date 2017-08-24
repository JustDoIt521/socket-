var app= require('http').createServer();

var io=require('socket.io')(app);       //封装对象
 
var clientCount=0;

var PORT=3000;

app.listen(PORT);   //监听3000端口

io.on('connection',function(socket){
	clientCount++;
	socket.nickname='user'+clientCount;
	io.emit('enter',socket.nickname+'comes in');    //广播用户进入消息

	socket.on('message',function(str){
		io.emit('message',socket.nickname+' says '+str);   //广播聊天信息
	});

	socket.on('disconnect',function(){
		io.emit('leave',socket.nickname+' left ');    //广播用户离开消息
	});
});
// Scream server example: "hi" -> "HI!!!"
/*var server = ws.createServer(function (conn) {
	console.log("New connection");
	clientCount++;
	conn.nickname='user'+clientCount;
	var mes={};
	mes.type="enter";
	mes.data=conn.nickname+' comes in';
	broadcast(JSON.stringify(mes));
	conn.on("text", function (str) {
		console.log("Received "+str);
		var mes={};
		mes.type="message";
		mes.data=conn.nickname+' : '+str;
		broadcast(JSON.stringify(mes));
	});
	conn.on("close", function (code, reason) {
		console.log("Connection closed");
		var mes={};
		mes.type="leave";
		mes.data=conn.nickname+' left';
		broadcast(JSON.stringify(mes));
	});
	conn.on("error",function(err){
		console.log("handle error");
		console.log(err);
	});
}).listen(PORT);


console.log("websocket listening on port "+PORT);
function broadcast(str){
	server.connections.forEach(function(connection){
		connection.sendText(str);
	});
}*/