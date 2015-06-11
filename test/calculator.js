/* global process */

var Expression = require("../dist/js/test");
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

console.log(Expression);

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function (input) {
	try {
		var expr = Expression.parse(input);
		//console.log(expr.toString() + " = " + expr.getValue());
		console.log(expr.evaluate(null));
	} catch (err) {
		console.error(err.message);
	}

	rl.prompt();
}).on('close', function () {
	console.log('\nHave a great day!');
	process.exit(0);
});