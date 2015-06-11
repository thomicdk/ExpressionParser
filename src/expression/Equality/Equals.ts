/// <reference path="../BinaryOperatorExpression.ts"/>

module expression {

	export class Equals extends BinaryOperatorExpression {
		constructor(leftOperand : Expression, rightOperand : Expression, operator : string = "==") {
			super(operator, leftOperand, rightOperand);
		}
				 
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return this.leftOperand.evaluate(ctx) === this.rightOperand.evaluate(ctx);
		}
	}
}
