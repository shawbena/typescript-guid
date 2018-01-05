const enum Enum {
	A = 1,
	B = A * 2
}

let a = Enum.A;

// error TS2476: A const enum member can only be accessed using a string literal.
// let nameOfA = Enum[a]; // 'A'