var socket;
// this is the adress to socket
var uri = "ws://localhost:8080/chat";

$(window).unload(function(){
	// close socket when browser is closed
	socket.close();
});

$(window).load(function(){
	// initialize socket after document is loaded
	openSocket();
});

function openSocket()
{
	// initialize WebSocket with uri as parameter
	socket = new WebSocket(uri);

	// on open
	socket.onopen = function()
	{
		console.log("socket opened");
	}

	// on close
	socket.onclose = function()
	{
		console.log("socket closed")
	}

	// on error
	socket.onerror = function()
	{
		console.log("socket error!")
	}

	// on message
	socket.onmessage = function(message)
	{
		// create new div - document.createElement
		var newDiv = document.createElement("div");

		// parse JSON from message.data and assign to object
		var messageObj = JSON.parse(message.data);

		// assign textContent - object.message
		newDiv.textContent = messageObj.message;

		// append new div to #messages container
		$("#messages").append(newDiv);
	}
}

function sendMessage()
{
	// get value from input - val()
	var inputContent = $("#input").val();

	// send via socket
	socket.send(inputContent);
}