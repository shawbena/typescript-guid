let o = {
	a: 'foo',
	b: 12,
	c: 'bar',
	d: 1,
	e: [1, 2, 3]
};
// let { a, b } = o;
// let {a, b}: {a: string, b: number} = o;

// ({ c, d } = { c: 'baz', d: 101 }); // 识别不了

let { c, ...passthrough } = o;
let total = passthrough.d + passthrough.e.length;

let { a: newName1, b: newName2 } = o;
