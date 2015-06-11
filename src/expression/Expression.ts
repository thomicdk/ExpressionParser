/// <reference path="IExpressionEvaluationContext.ts"/>

module expression {
	
    export interface IExpression {
       evaluate<TResult>(ctx : IExpressionEvaluationContext) : TResult;
	   evaluate(ctx : IExpressionEvaluationContext) : any;
	   
    }
		
	export class Expression implements IExpression {
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			// MUST BE OVERRIDDEN IN SUB-CLASSES
			return null;
		}
		
		static parse(expression : string) : Expression {
			var parser = new Parser();
			return parser.parse(expression);
		}
		
	}	
}