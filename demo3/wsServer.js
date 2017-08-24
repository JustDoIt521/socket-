var ws = require("nodejs-websocket");
var PORT=3000;

var clientCount=0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection");
	clientCount++;
	conn.nickname='user'+clientCount;   // 给进来的用户编辑名字
	broadcast(conn.nickname+' comes in');
	
	conn.on("text", function (str) {         //接收到消息
		console.log("Received "+str);
		//conn.sendText(str.toUpperCase()+"!!!")
		broadcast(str);
	});
	
	conn.on("close", function (code, reason) {    //连接关闭
		console.log("Connection closed");
		broadcast(conn.nickname+' left');
	});
	
	conn.on("error",function(err){             //客户端突然关闭(比如点掉网页)
		console.log("handle error");
		console.log(err);
	});
}).listen(PORT);

console.log("websocket listening on port "+PORT);

function broadcast(str){     //消息进行广播
	server.connections.forEach(function(connection){
		connection.sendText(str);
	});
}