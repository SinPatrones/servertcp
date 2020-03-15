module.exports = function (io){

    io.on('connection', socket => {
        console.log('Nuevo Socket Conectado: ' + socket.id);
        // AQUI SE CREAN LOS SOCKETS QUE RECIBIRA EL SERVIDOR

        socket.on('test', data => {
            console.log("RECIBIDO SERVER:", data);
            io.emit('testrespuesta', {status: "recibido", msg: data});
        });

        socket.on('disconnect', reason => {
            console.log("Socket Desconectado");
        });
    });


};
