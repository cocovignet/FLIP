var serverWebSocket = require("websocket").server;
var http = require("http");

function callback(request, response) {
/*  console.log(request)
  console.log(response)*/
}




var server = http.createServer(callback)
var port = 1337;

server.listen(port, function() {

  console.log("le port est actif");
});

var pipeLine = new serverWebSocket({
  httpServer:server
});

var clients = [];
var webapp;
var mobileController;

pipeLine.on("request", function(e) {
  var connection = e.accept(null, e.origin);
  var nom = new Date().getTime();
  console.log("new Client : "+nom);
  clients[nom] = {"connection":connection, "role" : ""};

  connection.on('message', function(message) {
    var json = JSON.parse(message.utf8Data);
    console.log(json);
    if(json.role != undefined) {
      clients[nom].role = json.role;
      console.log(clients[nom]);
    }
    else {
        for(var name in clients) {
          if(clients[name].role == json.sendTo && clients[name].connection != undefined) {
            clients[name].connection.send(JSON.stringify(json));
          }
        }
      }
  });

  connection.on('close', function(connection) {
    console.log("la connection "+connection+" a quitté");
  });
});
