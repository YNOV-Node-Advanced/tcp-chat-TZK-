const net = require("net");
const readline = require("readline");

const HOST = "127.0.0.1";
const PORT = 1337;

const client = new net.Socket();

client.connect(
    PORT,
    HOST,
    socket => {
        console.log("CONNECTED TO: " + HOST + ":" + PORT);

        let rl = readline.createInterface({
            input: process.stdin,
            output: null
        });

        rl.on("line", line => {
            client.write(line);
        });
    }
);

client.on("data", function(data) {
    console.log(data.toString());
});

client.on("close", function() {
    console.log("Connection closed");
    client.destroy();
});
