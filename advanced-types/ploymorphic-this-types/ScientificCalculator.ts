import BasicCalculator from './BasicCalculator';

class ScientificCalcalutor extends BasicCalculator{
	public constructor(value = 0){
		super(value);
	}

	public sin(){
		this.value = Math.sin(this.value);
		return this;
	}

	//... other operations go here ...
}

let v = new ScientificCalcalutor(2)
				.multiply(5)
				.sin()
				.add(1)
				.currentValue();

// let b = new BasicCalculator(5);