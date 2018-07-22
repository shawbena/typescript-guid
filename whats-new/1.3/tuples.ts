export default () => {}
//
let x: [string, number]
// 初始化
x = ['hello', 10]; // ok

/*
x[3] = 'world'; // OK
console.log(x[5].toString()); // OK, 'string' and 'number' both have toString
x[6] = true; // Error, boolean isn't number or string
*/
// x = ['', 1, 'hello'] // error

// 初始化不正确
x = ['hello', 10]; // ok
//
// x = ['hello', 10, 'ddd', 100] // error

console.log(x[0].substr(1)); // ok
// console.log(x[1].subr(1)); // Error, [ts] 类型“number”上不存在属性“subr”。

x[3] = 'world'; // OK


// ...
// 与元组不同   
// 声明一个数组, 数组中的元素只能是字符串数数字
let y: (string | number) [] = [1, 1, 1, 'sd']
let z: Array<string|number> = [1, 2,3, '']