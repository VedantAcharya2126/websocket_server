const EventEmit = require('events');
const fs = require('fs');

var url = 'http://mylogger.io/log';
let newMessage = {}
class Logger extends EventEmit {
	log(message) { 
		newMessage.data = message;
		var stream = fs.createWriteStream("/Users/vedantacharya/Desktop/projectV2/logs/logs.log", { flags: 'a' });
		[...Array(100000)].forEach(function (item, index) {
			console.log(item)
			stream.write(JSON.stringify(message) + "\n");
		});
		stream.end();
	}

}

module.exports = Logger;