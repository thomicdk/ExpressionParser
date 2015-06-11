/// <reference path="Expression.ts"/>

module expression {
	
	export class ParenthesisExpression extends Expression {
		
		private expression : IExpression;
		
		constructor(expression : IExpression) {
			super();
			this.expression = expression;
		} 
		
		evaluate(ctx : IExpressionEvaluationContext) : Object {
			return this.expression.evaluate(ctx);
		}
		
		toString() : string {
			return "(" + this.expression + ")";
		}
	}
}