/// <reference path="BinaryOperatorExpression.ts"/>
module expression {

	export class UnaryExpression extends Expression {
			
		protected expression : IExpression;
		private operator : string;
		
		constructor(expression : IExpression, operator : string) {
			super();
			this.expression = expression;
			this.operator = operator;
		}
	
		toString() : string {
			return this.operator + this.expression;
		}	
	}

	export class Minus extends UnaryExpression {
		
		constructor(expression : IExpression) {
			super(expression, "-");
		}
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return -this.expression.evaluate<number>(ctx);
		}
	}

	export class Not extends UnaryExpression {
		
		constructor(expression : IExpression) {
			super(expression, "!");
		}
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return !this.expression.evaluate<boolean>(ctx);
		}
	}
	
	export class Plus extends UnaryExpression {
		
		constructor(expression : IExpression) {
			super(expression, "+");
		}
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return +this.expression.evaluate<number>(ctx);
		}
	}
}
