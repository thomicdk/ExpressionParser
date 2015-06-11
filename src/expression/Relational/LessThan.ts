/// <reference path="../BinaryOperatorExpression.ts"/>

module expression {

	export class LessThan extends BinaryOperatorExpression {	
		constructor(leftOperand : IExpression, rightOperand : IExpression) {
			super("<", leftOperand, rightOperand);
		} 	
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return 	this.leftOperand.evaluate<number>(ctx) < 
					this.rightOperand.evaluate<number>(ctx);
		}
	}
}
