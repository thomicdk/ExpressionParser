
module expression {


export enum TokenType {
	Epsilon,
	Comma,
	LeftParen,
	RightParen,
	Identifier,
	Text,
	RegexPattern,
	Integer,
	Decimal,
	True,
	False,
	Not,
	Multiplication,
	Division,
	Remainder,
	Plus,
	Minus,
	Less,
	LessEqual,
	Greater,
	GreaterEqual,
	Equal,
	NotEqual,
	And,
	Or
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
		Tokenizer.add(",", TokenType.Comma);
		Tokenizer.add("\\(", TokenType.LeftParen);
		Tokenizer.add("\\)", TokenType.RightParen);
		Tokenizer.add("TRUE", TokenType.True);
		Tokenizer.add("FALSE", TokenType.False);
		
		Tokenizer.add("&&|AND", TokenType.And);		
		Tokenizer.add("\\|\\||OR", TokenType.Or);	
		
		Tokenizer.add("[a-zA-Z][a-zA-Z0-9_\\[\\]\\.]*", TokenType.Identifier);
		// http://stackoverflow.com/questions/5695240/php-regex-to-ignore-escaped-quotes-within-quotes
		Tokenizer.add("\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*\"", TokenType.Text);
		Tokenizer.add("/[^/\\\\]*(?:\\\\.[^/\\\\]*)*/", TokenType.RegexPattern);
				
		Tokenizer.add("\\d+(?!\\.|\\d)", TokenType.Integer);	
		Tokenizer.add("\\d+\\.\\d*|\\d*\\.\\d+", TokenType.Decimal);	

		Tokenizer.add("!(?!=)", TokenType.Not);
		Tokenizer.add("\\*", TokenType.Multiplication);
		Tokenizer.add("/", TokenType.Division);
		Tokenizer.add("%", TokenType.Remainder);	

		Tokenizer.add("\\+", TokenType.Plus);
		Tokenizer.add("-", TokenType.Minus);		
		
		Tokenizer.add("<(?!=)", TokenType.Less);
		Tokenizer.add("<=", TokenType.LessEqual);
		Tokenizer.add(">(?!=)", TokenType.Greater);
		Tokenizer.add(">=", TokenType.GreaterEqual);
		
		Tokenizer.add("==", TokenType.Equal);
		Tokenizer.add("!=", TokenType.NotEqual);				
	}
}
Tokenizer.initialize();

}