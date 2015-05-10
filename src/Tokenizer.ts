export enum TokenType {
	EPSILON = 0,
	COMMA = 1,
	LPAREN = 2,
	RPAREN = 3,
	IDENTIFIER = 4,
	STRING = 5,
	INTEGER = 6,
	DECIMAL = 7,
	TRUE = 8,
	FALSE = 9,
	PLUS = 11,
	MINUS = 12,
	MULTIPLICATION = 13,
	DIVISION = 14,
	AND = 21,
	OR = 22,
	NOT = 23,
	EQUAL = 24,
	NOTEQUAL = 25,
	LESS = 26,
	LESSEQ = 27,
	GREATER = 28,
	GREATEREQ = 29
}

export class TokenInfo {
	regex: RegExp;
	token: TokenType;

	constructor(regex: RegExp, token: TokenType) {
		this.regex = regex;
		this.token = token;
	}
}

export class Token {
	token: TokenType;
	sequence: string;
	position: number;
	
	constructor(token: TokenType, sequence: string, position: number) {
		this.token = token;
		this.sequence = sequence;
		this.position = position;
	}
}

export class Tokenizer {

	static tokenInfos: Array<TokenInfo> = [];
	tokens: Array<Token> = [];

	constructor() {

	}

	tokenize(str: string): Array<Token> {
		str = str.trim();
		var totalLength : number = str.length;
		this.tokens.length = 0; // Clear
		while (str !== "") {
			var remaining : number = str.length;
			var match: boolean = false;
			for (var i = 0; i < Tokenizer.tokenInfos.length && !match; i++) {
				var info: TokenInfo = Tokenizer.tokenInfos[i];
				var m: RegExpExecArray = info.regex.exec(str);
				if (m != null) {
					match = true;
					var sequence: string = m[1].trim();
					str = str.substring(sequence.length).trim();
					var tok = new Token(info.token, sequence, totalLength - remaining);
					//console.log("Token found", tok);
					this.tokens.push(tok);
					break;
				}
			}

			if (!match) 
				throw new TypeError("Unexpected character at col " + (totalLength-str.length+1) + ": " + str[0]);
		}
		return this.tokens;
	}

	getTokens(): Array<Token> {
		return this.tokens;
	}

	static add(regex: string, token: TokenType): void {
		var tokenInfo = new TokenInfo(new RegExp("^(" + regex + ")","i"), token);
		Tokenizer.tokenInfos.push(tokenInfo);
	}

	static initialize() {
		Tokenizer.add(",", TokenType.COMMA);
		Tokenizer.add("\\(", TokenType.LPAREN);
		Tokenizer.add("\\)", TokenType.RPAREN);
		Tokenizer.add("TRUE", TokenType.TRUE);
		Tokenizer.add("FALSE", TokenType.FALSE);
		Tokenizer.add("&&|AND", TokenType.AND);		
		Tokenizer.add("\\|\\||OR", TokenType.OR);	
		Tokenizer.add("[a-zA-Z][a-zA-Z0-9\\.]*", TokenType.IDENTIFIER);
		// http://stackoverflow.com/questions/5695240/php-regex-to-ignore-escaped-quotes-within-quotes
		Tokenizer.add("\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*\"", TokenType.STRING);		
		Tokenizer.add("\\d+(?!\\.|\\d)", TokenType.INTEGER);	
		Tokenizer.add("\\d+\\.\\d*|\\d*\\.\\d+", TokenType.DECIMAL);	

		Tokenizer.add("\\+", TokenType.PLUS);
		Tokenizer.add("-", TokenType.MINUS);		
		Tokenizer.add("\\*", TokenType.MULTIPLICATION);
		Tokenizer.add("/", TokenType.DIVISION);			
	
		Tokenizer.add("!(?!=)", TokenType.NOT);
		Tokenizer.add("==", TokenType.EQUAL);
		Tokenizer.add("!=", TokenType.NOTEQUAL);
			
		Tokenizer.add("<(?!=)", TokenType.LESS);
		Tokenizer.add("<=", TokenType.LESSEQ);
		Tokenizer.add(">(?!=)", TokenType.GREATER);
		Tokenizer.add(">=", TokenType.GREATEREQ);		
	}
}
Tokenizer.initialize();