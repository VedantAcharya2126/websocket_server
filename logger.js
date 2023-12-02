const EventEmit = require('events');
const fs = require('fs');

var url = 'http://mylogger.io/log';
let newMessage = {}
/**
 * Creating logger class to continuos log into the logs.log file. 
 * 
 * Parameter: -
 * 
 * Author: Vedant Acharya
 */
class Logger extends EventEmit {
	log(message) { 
		newMessage.data = message;
		var stream = fs.createWriteStream("//Users/vedantacharya/Desktop/websocket_server/logs/logs.log", { flags: 'a' });
		[...Array(100000)].forEach(function (item, index) {
			console.log(item)
			stream.write(JSON.stringify(message) + "\n");
		});
		stream.end();
	}

}

module.exports = Logger;