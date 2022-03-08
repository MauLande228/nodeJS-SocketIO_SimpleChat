const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT;

var app = express();
var server = app.listen(port, function(){
    console.log("Listening to request on port 3000");
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})