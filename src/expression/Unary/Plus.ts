///<reference path="../Expression.ts" />
///<reference path="UnaryExpression.ts" />

module expression {
	
	export class Plus extends UnaryExpression {
		
		constructor(expression : IExpression) {
			super(expression, "+");
		}
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return +this.expression.evaluate<number>(ctx);
		}
	}
}