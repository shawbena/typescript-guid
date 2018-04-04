export default () => {}

interface Empty<T>{

}

let x: Empty<number> = {a: ''};
let y: Empty<string> = 1;

x = y; // okay, y matches structure of x

interface NotEmpty<T>{
    data: T;
}

let x1: NotEmpty<number> = { data: 1 };
let y1: NotEmpty<string> = { data: '' };

// 不能将类型“NotEmpty<string>”分配给类型“NotEmpty<number>”。
//   不能将类型“string”分配给类型“number”。
// x1 = y1;