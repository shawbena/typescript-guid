export default class C {
	p = 12;
	m(){}
}

let c = new C();
let clone = { ...c };
clone.p;
// clone.m();

let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' };
let search = { ...defaults, food: 'rich'};

let search2 = { ...defaults };

let arrs:number[] = [1, 2]

let arr:any[] = [...arrs, '4', 'five', 6];
