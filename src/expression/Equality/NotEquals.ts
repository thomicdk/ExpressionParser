/// <reference path="../BinaryOperatorExpression.ts"/>

module expression {

	export class NotEquals extends Equals {
		constructor(leftOperand : Expression, rightOperand : Expression) {
			super(leftOperand, rightOperand, "!=");
		}
		 
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return !super.evaluate(ctx);
		}
	}
}
