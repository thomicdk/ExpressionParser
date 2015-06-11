/// <reference path="Expression.ts"/>

module expression {
	
	export class BinaryOperatorExpression extends Expression {
		
		protected leftOperand : IExpression;
		protected rightOperand : IExpression;
		private operator : string;
		
		constructor(operator : string, expr1 : IExpression, expr2 : IExpression) {
			super();
			this.operator = operator;
			this.leftOperand = expr1;
			this.rightOperand = expr2;
		} 
		toString() : string {
			return this.leftOperand.toString() + " " + this.operator + " " + this.rightOperand.toString();
		}
	}	
}
