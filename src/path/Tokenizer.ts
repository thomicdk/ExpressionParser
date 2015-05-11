export enum TokenType {
	EPSILON = 0,
	DOT = 1,
	LSQBRACKET = 2,
	RSQBRACKET = 3,
	IDENTIFIER = 4,
	INTEGER = 5,
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
		Tokenizer.add("\\.", TokenType.DOT);
		Tokenizer.add("\\[", TokenType.LSQBRACKET);
		Tokenizer.add("\\]", TokenType.RSQBRACKET);
		Tokenizer.add("[a-zA-Z][a-zA-Z0-9_]*", TokenType.IDENTIFIER);
		Tokenizer.add("0|[1-9][0-9]*", TokenType.INTEGER);		
	}
}
Tokenizer.initialize();