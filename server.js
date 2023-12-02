// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const https = require('https');
// const logger = require('./logger');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

var Logger = require('./logger');
const logger = new Logger;
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

let fetchedData = null;
let counter = 0;

/**
 * This function is used to get JSON data continiously from a URL at specific period of time
 * 
 * Parameter: None
 * 
 * Author: Vedant Acharya
 */
function fetchDataFromUrl() {
    // Replace 'YOUR_API_URL' with the actual URL you want to fetch data from
    counter += 1;
    const url = 'https://jsonplaceholder.typicode.com/todos/' + counter.toString();

    https.get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                fetchedData = json
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
}

fetchDataFromUrl();

// Fetch data from the URL every 30 seconds
setInterval(fetchDataFromUrl, 5000);

/**
 * Creating websocket server 
 * 
 * Parameter: -
 * 
 * Author: Vedant Acharya
 */
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send continuous data to the connected client
    const sendDataInterval = setInterval(() => {
        const continuousData = fetchedData;
        ws.send(JSON.stringify(continuousData));
        // logger.info('Uncaught exception:');
        logger.log(fetchedData);

    }, 1000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(sendDataInterval);
    });
});

app.get('/connect', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
