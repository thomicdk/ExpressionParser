/// <reference path="BinaryOperatorExpression.ts"/>
module expression {

	export class Addition extends BinaryOperatorExpression {	
		constructor(leftOperand : IExpression, rightOperand : IExpression) {
			super("+", leftOperand, rightOperand);
		} 	
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return 	this.leftOperand.evaluate<number>(ctx) + 
					this.rightOperand.evaluate<number>(ctx);
		}
	}
	
	export class Subtraction extends BinaryOperatorExpression {	
		constructor(leftOperand : IExpression, rightOperand : IExpression) {
			super("-", leftOperand, rightOperand);
		} 	
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return 	this.leftOperand.evaluate<number>(ctx) - 
					this.rightOperand.evaluate<number>(ctx);
		}
	}
}
