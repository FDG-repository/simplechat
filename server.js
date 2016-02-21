var http = require('http'),
    fs = require('fs');
	
var people = {};
//var port = process.env.OPENSHIFT_NODEJS_PORT || "1337";
var port = "1337";
//var serverUrl = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var serverUrl = "127.0.0.1";
	
var app = http.createServer(function (request, response) 
{
	//console.log("Server request: " + request.url)
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
        people[client.id] = {name:name, html:'<span onclick="msgTo(\''+client.id+'\')" title="Type a message and click here to send in private">'+name+'</span>'}; //data["name"];
		io.sockets.to(client.id).emit('messageMe', 'Server', 'You have connected.');
		io.sockets.emit("update", name + " has joined the server.")
		io.sockets.emit("update-people", people);
		console.log("New join: " + name);
    });
	
	client.on('sendTo', function(id, msg, name){
		if (people[client.id] == undefined || people[client.id] == null)
		{
			people[client.id] = {name:name, html:'<span onclick="msgTo(\''+client.id+'\')" title="Type a message and click here to send in private">'+name+'</span>'}; //data["name"];
			io.sockets.to(client.id).emit('messageMe', 'Server', 'You have connected.');
			io.sockets.emit("update", name + " has joined the server.")
			io.sockets.emit("update-people", people);
			console.log("New join: " + name);
		}
		io.sockets.to(id).emit('messageMe', people[client.id]["name"] + '<span style="color:red"> in PVT</span>', msg);
		io.sockets.to(client.id).emit('messageMe', people[client.id]["name"] + '<span style="color:red"> in PVT</span>', msg);
	});
	
	client.on("sendAll", function(msg, name){
        if (people[client.id] == undefined || people[client.id] == null)
		{
			people[client.id] = {name:name, html:'<span onclick="msgTo(\''+client.id+'\')" title="Type a message and click here to send in private">'+name+'</span>'}; //data["name"];
			io.sockets.to(client.id).emit('messageMe', 'Server', 'You have connected.');
			io.sockets.emit("update", name + " has joined the server.")
			io.sockets.emit("update-people", people);
			console.log("New join: " + name);
		}
		//console.log("Send message by " + people[client.id] + ": " + msg);
		io.sockets.emit("chat", people[client.id]["name"], msg);		
    });
	
	client.on("disconnect", function(){
		if (people[client.id] != undefined){
			io.sockets.emit("update", people[client.id]["name"] + " has left the server.");
			console.log(people[client.id]["name"] + " was disconnected")
			delete people[client.id];
			io.sockets.emit("update-people", people);
		}
    });
});