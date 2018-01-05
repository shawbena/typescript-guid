function identity<T>(arg: T): T{
	return arg;
}

// let output = identity<string>('hh');

// function identity<"hh">(arg: "hh"): "hh"
let output = identity('hh');