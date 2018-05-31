const net = require("net");

let HOST = "127.0.0.1";
let PORT = 1337;

let clients = [];
let clientCount = 0;

net.createServer(sock => {
    const clientIndex = clientCount++;

    console.log(
        "CLIENT CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort
    );

    clients.push(sock);
    sock.on("data", data => {
        clients.forEach(client => {
            client.write(`User${clientIndex} - ${data.toString()}`);
        });
    });

    sock.on("close", data => {
        console.log(
            "CLIENT DISCONNECTED: " + sock.remoteAddress + " " + sock.remotePort
        );
    });
}).listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
