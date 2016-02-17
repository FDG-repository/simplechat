var http = require('http'),
    fs = require('fs');
	
var people = {};
var port = 1337;
var serverUrl = "192.168.0.98";//"10.0.0.104";//"127.0.0.1";
	
var app = http.createServer(function (request, response) 
{
	console.log("Server request: " + request.url)
	fs.readFile("chat.html", 'utf-8', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(port, serverUrl);

console.log("Listening at " + serverUrl + ":" + port);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(client) {
    client.emit('connected');
	client.on("join", function(name){
        people[client.id] = name; //data["name"];
        //client.emit("update", "You have connected to the server.");
        io.sockets.emit("update", name + " has joined the server.")
        io.sockets.emit("update-people", people);
		console.log("New join: " + name);
    });
	
	client.on("send", function(msg){
        console.log("Send message by " + people[client.id] + ": " + msg);
		io.sockets.emit("chat", people[client.id], msg);		
    });
	
	client.on("disconnect", function(){
		io.sockets.emit("update", people[client.id] + " has left the server.");
		console.log(people[client.id] + " was disconnected")
        delete people[client.id];
        io.sockets.emit("update-people", people);		
    });
});