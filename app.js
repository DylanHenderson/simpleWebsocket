var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
 
var count = 0;

//connect to websocket
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  //send a new message through the websocket every 2 seconds
  setInterval(sendaMessage,2000,ws);
});
 
//send a message through a websocket
function sendaMessage(ws){


	console.log(count);
    count++;
    max = 50000;
    min = 1000;
    expiration = Math.random() * (max - min) + min;

    //sample to be sent
    x = {
  	  id: 1000+count,
  	  creator_id: "abvdef12345",
      expiration_time: expiration
    };
    //can only send string,we must parse on the other end
    ws.send(JSON.stringify(x));
    console.log('socket',"message sent");
}

console.log("starting");

//connecting on localhost:3000
app.listen(3000);
