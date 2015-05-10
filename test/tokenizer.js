/* global process */

var Tokenizer = require("../dist/js/Tokenizer");
var tokenizer = new Tokenizer.Tokenizer();
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function (input) {
	try {
		tokenizer.tokenize(input).forEach(function(token) {
			console.log(token.position + ": " + token.sequence + " (" + token.token + ")");
		});
	} catch (err) {
		console.error(err.message);
	}

	rl.prompt();
}).on('close', function () {
	console.log('\nHave a great day!');
	process.exit(0);
});