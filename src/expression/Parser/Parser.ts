/// <reference path="../Expression.ts"/>
/// <reference path="../Function/FunctionExpression.ts"/>
/// <reference path="Tokenizer.ts"/>

module expression {

var Functions : Object = Object.create(null);
	

export class Parser {
	
	private tokens : Array<Token>;
	private lookAhead : Token;
	
	constructor(){}

	parse(expression: string) : IExpression {
		var tokenizer = new Tokenizer();
		this.tokens = tokenizer.tokenize(expression);	
		this.lookAhead = this.tokens[0];
		
		var expr = this.expression();
		
		if (this.lookAhead.token != TokenType.Epsilon)
      		throw new TypeError("Unexpected symbol '" + this.lookAhead.sequence + "' found");
		
		return expr;
	}
	
	private expression(): IExpression {
		var expr = this.orExpression();
		return expr;
	}
	
	private orExpression() : IExpression {
	    var expression = this.andExpression();
        while (this.lookAhead.token == TokenType.Or) 
        {
		    this.nextToken();
            var rightOperand = this.andExpression();
		    expression = new Or(expression, rightOperand);
	    }
	    return expression;
	}

	private andExpression() : IExpression {
		var expression = this.equalityExpression();
		while (this.lookAhead.token == TokenType.And) {
			this.nextToken();
			var rightOperand = this.equalityExpression();
			expression = new And(expression, rightOperand);
		}
		return expression;
	}	
	
	private equalityExpression() : IExpression {
		var expression = this.relationalExpression();
		
        while ( this.lookAhead.token == TokenType.Equal || 
                this.lookAhead.token == TokenType.NotEqual)
        {
            var type = this.lookAhead.token;
            this.nextToken();
            var rightOperand = this.relationalExpression();
            switch (type)
            {
                case TokenType.Equal:
                    expression = new Equals(expression, rightOperand);
                    break;
                case TokenType.NotEqual:
                    expression = new NotEquals(expression, rightOperand);
                    break;
            }     
        }
        return expression;
	}
	
	private relationalExpression() : IExpression {
        var expression = this.additiveExpression();
        while ( this.lookAhead.token == TokenType.Less ||
                this.lookAhead.token == TokenType.LessEqual ||
                this.lookAhead.token == TokenType.Greater ||
                this.lookAhead.token == TokenType.GreaterEqual)
        {
            var type = this.lookAhead.token;
            this.nextToken();
            var rightOperand = this.additiveExpression();
            switch (type)
            {
                case TokenType.Less:
                    expression = new LessThan(expression, rightOperand);
                    break;
                case TokenType.LessEqual:
                    expression = new LessThanOrEquals(expression, rightOperand);
                    break;
                case TokenType.Greater:
                    expression = new GreaterThan(expression, rightOperand);
                    break;
                case TokenType.GreaterEqual:
                    expression = new GreaterThanOrEquals(expression, rightOperand);
                    break;
            }
        }
	    return expression;
	}
	
	private additiveExpression() : IExpression {
	    var expression = this.multiplicativeExpression();
        while ( this.lookAhead.token == TokenType.Plus || 
                this.lookAhead.token == TokenType.Minus)
        {
            var type = this.lookAhead.token;
            this.nextToken();
            var rightOperand = this.multiplicativeExpression();
            switch (type)
            {
                case TokenType.Plus:
                    expression = new Addition(expression, rightOperand);
                    break;
                case TokenType.Minus:
                    expression = new Subtraction(expression, rightOperand);
                    break;
            }        
        }
	    return expression;
	}
	
	private multiplicativeExpression() : IExpression {
		var expression = this.unaryExpression();
		
        while ( this.lookAhead.token == TokenType.Multiplication || 
                this.lookAhead.token == TokenType.Division ||
                this.lookAhead.token == TokenType.Remainder)
        {
            var type = this.lookAhead.token;
            this.nextToken();
            var rightOperand = this.unaryExpression();

            switch (type)
            {
                case TokenType.Multiplication:
                    expression = new Multiplication(expression, rightOperand);
                    break;
                case TokenType.Division:
                    expression = new Division(expression, rightOperand);
                    break;
                case TokenType.Remainder:
                    expression = new Remainder(expression, rightOperand);
                    break;
            }
        }
		return expression;
	}
	
	private unaryExpression() : IExpression {
        if (this.lookAhead.token == TokenType.Plus ||
            this.lookAhead.token == TokenType.Minus ||
            this.lookAhead.token == TokenType.Not)
        {
            var type = this.lookAhead.token;
            this.nextToken();
            var atom = this.atom();

            switch (type)
            {
                case TokenType.Plus:
                    return new Plus(atom);
                case TokenType.Minus:
                    return new Minus(atom);
                case TokenType.Not:
                    return new Not(atom);    
            }
        }
        return this.atom();
	}
	
	private atom() : IExpression {
		
		var atom : IExpression;
		
		switch (this.lookAhead.token){
			case TokenType.Identifier:
				return this.identifier();
			case TokenType.LeftParen:
				this.nextToken();
				var innerExpression = this.expression();
				if (this.lookAhead.token != TokenType.RightParen) {
					throw new TypeError("Unexpected token: '" + this.lookAhead.sequence + "'");	
				}
				atom = new ParenthesisExpression(innerExpression);
				break;
			case TokenType.Text:
				var text = this.lookAhead.sequence.substring(1, this.lookAhead.sequence.length - 1);
				atom = new TextConstant(text);
				break;
			case TokenType.Integer:
				var integer = parseInt(this.lookAhead.sequence, 10);
				atom = new NumberConstant(integer);
				break;	
			case TokenType.Decimal:
				var decimal = parseFloat(this.lookAhead.sequence);
				atom = new NumberConstant(decimal);
				break;
			case TokenType.True:
			case TokenType.False:
				var boolean = this.lookAhead.sequence ? (this.lookAhead.sequence.toLowerCase() === "true") : false
				atom = new BooleanConstant(boolean);
				break;
			default:
				throw new TypeError("Unexpected token: '" + this.lookAhead.sequence + "'");
		}
		
        this.nextToken();
        return atom;
	}
	
	private identifier() : IExpression {
		var identifier = this.lookAhead.sequence;
		this.nextToken();
		if (this.lookAhead.token == TokenType.LeftParen) {
			this.nextToken();
			return this.functionCall(identifier);
		}
		return new VariableExpression(identifier);
	}
	
	
		
	private functionCall(functionName : string) : IExpression {
		
        if (!Functions.hasOwnProperty(functionName))
        {
            throw new TypeError("Unknown function: '" + functionName + "'");
        }
        var functionExpression : IFunctionExpression = new Functions[functionName]();

        // Parse the expected number of arguments to the function
        for (var i = 1; i <= functionExpression.argumentCount; i++)
        {
            var argument = this.functionCallArgument(i == functionExpression.argumentCount);
            functionExpression.addArgument(argument);
        }

	    if (this.lookAhead.token != TokenType.RightParen) {
			throw new TypeError("Unexpected token: '" + this.lookAhead.sequence + "'. Expected ')'.");
		}
        this.nextToken();

        return functionExpression;
	}
	
	private functionCallArgument(isLastArgument : boolean) : IExpression {
        var argument : IExpression;
        if (this.lookAhead.token == TokenType.RegexPattern)
        {
            var pattern = this.lookAhead.sequence.substring(1, this.lookAhead.sequence.length - 1);
            argument = new RegexConstant(pattern);
            this.nextToken();
        }
        else
        {
            argument = this.expression();
        }
        if (!isLastArgument)
        {
            if (this.lookAhead.token == TokenType.Comma)
            {
                this.nextToken();
            }
            else
            {
				throw new TypeError("Unexpected token. Expected ','.");
            }
	    } 
	    return argument;
	}
	
	
  /**
   * Remove the first token from the list and store the next token in lookahead
   */
  private nextToken() : void
  {
    this.tokens.shift();
    // at the end of input we return an epsilon token
    if (this.tokens.length === 0)
      this.lookAhead = new Token(TokenType.Epsilon, "", -1);
    else
      this.lookAhead = this.tokens[0];
  }
}


}
