const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO.listen(server);

app.use(express.static(path.join(__dirname, 'public')));


// MIDDLEWARE
app.use(morgan("dev"));

require('./sockets/mainsocket')(io);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);


app.use('/', require('./routes/index.router'));

// servidor TCP
let net = require('net');

const HOST = '127.0.0.1';
const PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('SERVER) CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('SERVER) DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('ME dijiste lo siguiente--> "' + data + '"');

        io.emit('tcpServer', "TCP MSG: " + data);
    });
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('SERVER) CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);

server.listen(3000, () => {
    console.log("Servidor NODE JS en el puerto 3000");
});