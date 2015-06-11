module expression {
	
    export interface IExpressionEvaluationContext {
       
	   resolveVariable(variable : string) : any;
    }
}