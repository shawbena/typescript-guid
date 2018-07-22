import { StringValidator } from '../Validation';

const numberRegexp = /^[0-9]+$/;

class ZipCodeValidator implements StringValidator{
	isAcceptable(s: string): boolean {
		return s.length ===  5 && numberRegexp.test(s);
	}
}

export = ZipCodeValidator;