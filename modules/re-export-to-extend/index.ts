import { Calculator, test } from './Calculator';
import { Calculator as programmerCalculator, test as programmerTest } from './ProgrammerCalculator'

let c = new Calculator();

test(c, '1+2*33/11=');

let pc = new programmerCalculator(2);
programmerTest(pc, '001+010=');
