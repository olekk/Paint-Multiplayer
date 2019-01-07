var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4444, function(){
    console.log('Listeningg to requests on port 4444');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connectionn', socket.id);
    
    socket.on('canvass', function(data){
        io.sockets.emit('canvass', data);
    });
  
});

