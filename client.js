var net = require('net');

//const HOST = '134.122.27.72';
const HOST = '127.0.0.1';
const PORT = 3001

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    client.write('¡¡SOY MATHIAS xD!!');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

client.on('error', ex => {
    console.log("Error en conectar al servidor");
    console.log(ex);
});