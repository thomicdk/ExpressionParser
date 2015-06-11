///<reference path="../Expression.ts" />

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
}