# TypeScript 1.3

## Protected

类中新的 `protected` 修饰符，就像类似的语言 C++, C# 和 Java 中一样。类中声明的受保护成员只在类的子类中可见。

```ts
class Thing {
  protected doSomething() { /* ... */ }
}

class MyThing extends Thing {
  public myMethod() {
    // OK, can access protected member from subclass
    this.doSomething();
  }
}
var t = new MyThing();
t.doSomething(); // Error, cannot call protected member from outside class
```

## Tuple types

元组类型 (tuple types) 表示一个数组中某些类型的元素是已知的，但并不一定就是这样 (?)。如你可能想表示一个数组，索引0处是字符串，索引1处是数字：

```ts
// Declare a tuple type
var x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

当访问有已经索引的元素时，取回正确的类型：

```ts
```

在 TypeScript 1.4 中，当访问已知索引之外的元素时，会是联合类型 (union type)。

```ts
x[3] = 'world'; // OK
console.log(x[5].toString()); // OK, 'string' and 'number' both have toString
x[6] = true; // Error, boolean isn't number or string
```

....

## `let` 声明

## `const` 声明

## 模板字符串

## Type Guards

JavaScript 中使用 `typeof` 或 `instanceof` 在运行时检测表达式类型是家常便饭。现在当用于 `if` 块中时 TypeScript 理解这些条件并相应地更改类型推断。

使用 `typeof` 来测试变量：

```ts
var x: any = /* ... */;
if(typeof x === 'string') {
    console.log(x.subtr(1)); // Error, 'subtr' does not exist on 'string'
}
// x is still any here
x.unknown(); // OK
```

用于联合类型：

```ts
var x: string | HTMLElement = /* ... */;
if(typeof x === 'string') {
    // x is string here, as shown above
}
else {
    // x is HTMLElement here
    console.log(x.innerHTML);
}
```
`instanceof` 用于联合类型和类：

```ts
class Dog { woof() { } }
class Cat { meow() { } }
var pet: Dog|Cat = /* ... */;
if (pet instanceof Dog) {
    pet.woof(); // OK
}
else {
    pet.woof(); // Error
}

```

## Type alias

## `const enum` (completely inline enums) 

枚举是有有用的，但一些程序实在不需要生成的代码，那么可以以枚举成员等同的数字值内联所有的枚举成员。新的 `const enum` 声明就像常规的 `enum` 一样，但在编译时完全被擦除掉了。

```ts
const enum Suit { Clubs, Diamonds, Hearts, Spades }
var d = Suit.Diamonds;
```

编译成：

```js
var d = 1 /* Diamonds */;
```

现在 TypeScript 将适时计算枚举值：

```ts
enum MyFlags {
  None = 0,
  Neat = 1,
  Cool = 2,
  Awesome = 4,
  Best = Neat | Cool | Awesome
}
var b = MyFlags.Best; // emits var b = 7;
```

## `-noEmitOnError` 命令行选项

TypeScript 编译器的默认行为是如果有类型错误 (如将 `string` 赋给 `number`) 仍然输出 .js 文件。当需要干净的编译版本时这不是想要的结果。新的 `noEmitOnError` 防止有错误时输出 .js 代码。

现在这是 MSBuild 项目的默认行为。

## AMD Module names

默认生成的 AMD 模块是匿名的。当其他工具 (如 `r.js`) 用于处理结果模块时会导致问题。

新的 `amd-module name` 标签使得可以给编译器传递一个可选的模块名：

```ts
//// [amdModule.ts]
///<amd-module name='NamedModule'/>
export class C {
}
```

结果名称 `NamedModule` 将赋给作为调用 AMD `define` 的模块的一部分。