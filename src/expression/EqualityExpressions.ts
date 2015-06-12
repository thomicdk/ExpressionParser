/// <reference path="BinaryOperatorExpression.ts"/>
module expression {

	export class Equals extends BinaryOperatorExpression {
		constructor(leftOperand : Expression, rightOperand : Expression, operator : string = "==") {
			super(operator, leftOperand, rightOperand);
		}
				 
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return this.leftOperand.evaluate(ctx) === this.rightOperand.evaluate(ctx);
		}
	}
	
	export class NotEquals extends Equals {
		constructor(leftOperand : Expression, rightOperand : Expression) {
			super(leftOperand, rightOperand, "!=");
		}
		 
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return !super.evaluate(ctx);
		}
	}
}
