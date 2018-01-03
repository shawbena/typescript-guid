import { StringValidator } from './Validation';
import { ZipCodeValidator } from './ZipCodeValidator';
import { LettersOnlyValidator } from './LettersOnlyValidator';

// some samples to try
let strings = ['Hello', '98052', '101'];

// validators to use

let validators: { [s: string]: StringValidator} = {};

validators['ZIP code'] = new ZipCodeValidator();
validators['Letters only'] = new LettersOnlyValidator();

// show whether each string passed each validator
strings.forEach(s => {
	for(let name in validators){
		console.log(`"${ s }" - ${validators[name].isAcceptable} ? 'matches' : 'does not match' ${ name }`);
	}
});