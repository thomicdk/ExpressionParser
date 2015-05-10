/* global process */

var Parser = require("../dist/js/Parser");
var parser = new Parser.Parser();
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function (input) {
	try {
		var expr = parser.parse(input);
		//console.log(expr.toString() + " = " + expr.getValue());
		console.log(expr.getValue());
	} catch (err) {
		console.error(err.message);
	}

	rl.prompt();
}).on('close', function () {
	console.log('\nHave a great day!');
	process.exit(0);
});