var ws = require("nodejs-websocket");
var PORT=3000;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection");
	
	conn.on("text", function (str) {         //接收到的消息
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")  //大写并发送给客户端
	});
	
	conn.on("close", function (code, reason) {
		console.log("Connection closed")    //客户端关闭时调用
	});
	
	conn.on("error",function(err){       
		console.log("handle error");
		console.log(err);
	});
}).listen(PORT);

console.log("websocket listening on port "+PORT);