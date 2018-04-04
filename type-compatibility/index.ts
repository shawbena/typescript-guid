// export default () => {}

// interface Named{
//     name: string;
// }
// interface Employee{
//     name: string;
//     location: string;
// }
// interface Animal{
//     name: string;
// }
// class Person{
//     name: string;
// }

// let p: Named;

// // ok, because of structural typing
// p = new Person();

// let cat: Animal = p;

// cat = {
//     name: 'yougata'
// };

// p = cat;

// // let x = (a: number) => 0;
// // let y = (b: number, s: string) => 0;

// [].forEach((item) => console.log(item))

// let x: () => Named;
// let y: () => Employee;

// // x = y;
// // error
// // 不能将类型“() => Named”分配给类型“() => Employee”。
// // 不能将类型“Named”分配给类型“Employee”。
// // 类型“Named”中缺少属性“location”。
// // y = x;