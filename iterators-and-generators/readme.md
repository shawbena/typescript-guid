# Iterables

如果一个对象有 [Symbol.iterator](/symbols/#symboliterator) 属性实现，那么该对象被认为是可遍历的。

一些内置的类型如 `Array`, `Map`, `Set`, `String`, `Int32Array` `Uint32Array` 等等，已经有他们自己的 `Symbol.iteraotr` 属性实现。

`Symbos.itertors` 函数用于对象负责返回遍历对象的值列表。

## `for..of` statements

`for..of` 循环一个可遍历对象，调用对象的 `Symbol.iterator` 属性。

这里有一个简单的 `for..of` 循环用于数组的例子：

[index.ts](./index.ts)

```ts
let someArray = [1, 'string', false];

for(let entry of someArray){
    console.log(entry);
}
```

## `for..of` vs. `for..in` statements

`for..of` 和 `for..in` 语句都遍历列表，而遍历的值却不同，`for..in` 返回遍历对象的 keys (键), 而 `for..of` 返回被遍历对象的数值属性的 values (值)。

```ts
let list = [4, 5, 6];

for (let i in list) {
   console.log(i); // "0", "1", "2",
}

for (let i of list) {
   console.log(i); // "4", "5", "6"
}
```

另一个区别是 `for..in` 操作任何对象，是用于视察对象属性的方式。

而 `for..of`，主要对可遍历对象的值感兴趣。内置对象如 `Map` 及 `Set` 这些实现了 `Symbol.iterator` 属性，可以访问其存储的值。

```ts
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for(let pet in pets){
    console.log(pet); // species
}

for(let pet of pets){
    console.log(pet); // "Cat", "Dog", "Hamster"
}
```

## Code generation

### Targeting ES5 and ES3

当面向 ES5 或 ES3 时，iterators 只允许用于 `Array` 类型的值。

`for..of` 用于非数组值是错误的，即使非数组值实现了 `Symbol.iterator` 属性也不行。

编译器将对 `for..of` 循环生成一个简单的 `for` 循环，如：

```ts
let numbers = [1, 2, 3];
for(let num of numbers){
    console.log(num);
}
```

将生成：

```js
var numbers = [1, 2, 3];
for(var _i = 0; i < numbers.length; _i++){
    var num = numbers[_i];
    console.log(num);
}
```

### Targeting ECMAScript 2015 and higher

当面向 ECMAScript 2015 兼容的引擎，编译器将生成面向引擎中内置的遍历器实现的 `for..of` 循环。
