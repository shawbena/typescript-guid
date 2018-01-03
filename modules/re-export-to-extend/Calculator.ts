export class Calculator{
	private current = 0;
	private memory = 0;
	private operator: string;

	protected processDigit(digit: string, currentValue: number){
		// processDigit 可能不返回值，但为什么类型推断返回类型为 number
		// 参见[类型推断](/type-inference/)
		if(digit >= '0' && digit <= '9'){
			return currentValue * 10 + (digit.charCodeAt(0) - '0'.charCodeAt(0))
		}
	}

	protected processOperator(operator: string){
		if(['+', '-', '*', '/'].indexOf(operator) >= 0){
			return operator;
		}
	}

	protected evaluateOperator(operator: string, left: number, right: number): number{
		switch(operator){
			case '+': return left + right;
			case '-': return left - right;
			case '*': return left * right;
			case '/': return left / right;
		}
	}

	private evaluate(){
		if(this.operator){
			this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
		}else{
			this.memory = this.current;
		}
		this.current = 0;
	}

	public handelChar(char: string){
		if(char === '='){
			this.evaluate();
			return;
		}else{
			let value = this.processDigit(char, this.current);
			// value 推断为 number 类型，为什么还可以是 undefined ok
			if(value !== undefined){
				this.current = value;
				return;
			}else{
				let value = this.processOperator(char);
				if(value != undefined){
					this.evaluate();
					this.operator = value;
					return;
				}
			}
		}

		throw new Error(`Unsupported input: ${char}`);
	}

	public getResult(){
		return this.memory;
	}
}

export function test(c: Calculator, input: string){
	for(let i = 0; i < input.length; i++){
		c.handelChar(input[i]);
	}

	console.log(`result of '${input}' is '${c.getResult()}'`);
}