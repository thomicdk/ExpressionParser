module expression {
	
	export class VariableExpression extends Expression {
		
		private variable : string;
		
		constructor(variable : string){
			super();
			this.variable = variable;
		}
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return ctx.resolveVariable(this.variable);
		}
		
		toString() : string{
			return this.variable;
		}	
	}
}