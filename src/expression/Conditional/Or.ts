
/// <reference path="../BinaryOperatorExpression.ts"/>

module expression {
	
	export class Or extends BinaryOperatorExpression {
		
		constructor(expr1 : IExpression, expr2 : IExpression) {
			super("||", expr1, expr2);
		}
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return 	this.leftOperand.evaluate<boolean>(ctx) || 
					this.rightOperand.evaluate<boolean>(ctx);
		}
	}
}