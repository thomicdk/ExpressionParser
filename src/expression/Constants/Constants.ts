/// <reference path="../Expression.ts"/>

module expression {
	
	export class Constant<TValue> extends Expression {
		
		protected value : TValue;
		
		constructor(value : TValue) {
			super();
			this.value = value;
		}
		
		evaluate(ctx : IExpressionEvaluationContext) : any {
			return this.value;
		}
		
		toString() : string {
			return this.value.toString();
		}
	}
	
	export class BooleanConstant extends Constant<boolean> {
		constructor(value : boolean) {
			super(value);
		}
	}
	
	export class NumberConstant extends Constant<number> {
		constructor(value : number) {
			super(value);
		}
	}
	
	export class TextConstant extends Constant<string> {
		constructor(value : string) {
			super(value);
		}
		
		toString() : string {
			return "\"" + this.value.toString() + "\"";
		}
	}
	
	export class RegexConstant extends Constant<RegExp> {
		constructor(value : string) {
			var regex = new RegExp(value, "ig");
			super(regex);
		}
	}
}
