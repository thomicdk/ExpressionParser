///<reference path="../Expression.ts" />

module expression {
	
	export interface IFunctionExpression extends IExpression {
        argumentCount : number;
        addArgument(argument : IExpression) : void;
	}
	
}