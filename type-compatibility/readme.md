# Type Compatibility

TypeScript 中的类型兼容基于结构化的子类型 (structural subtyping)。

结构化类型是仅基于成员关联类型的一种方式。

这与名义上 (nominal) 的类型不同。

考虑以下代码：

[index.ts](./index.ts)

```ts
interface Named{
    name: string;
}

class Person{
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```

在名义上类型化的语言如 C# 或 Java, 同样的代码将会报错，因为 `Person` 类并没有明确地说自己实现了 `Named` 接口。

TypeScript 的结构化类型是基于 JavaScript 代码通常的写法而设计的。

因为 JavaSccript 广泛使用匿名对象如函数表达式和对象字面量，以结构化类型而非名义类型表达 JavaScript 中发现的各种类型的关系更加自然。// 而且也方便

## A Note on Soundness

TypeScript 类型系统允许在编译时未知的某些操作为安全操作。当一个类型系统有这个属性时，我们说他 not "sound" (不稳妥)。TypeScript 允许不稳妥的行为的地方会被仔细考虑，文档中我们将解释哪里会发生这样的事性后跟令人鸡冻的情形。

## Starting out

结构化类型的基本原则是如果 `y` 至少有和 `x` 一样的成员就说 `x` 兼容 `y`. 如：

```ts
interface Named{
    name: string;
}

let x: Named;
//
let y = { name: 'Alice', location: 'Seattle' };
x = y;
```

要核实 `y` 是否可以赋值给 `x`, 编译器检查 `x` 的每个属性，并在 `y` 中找出兼容的属性。

这里，`y` 必须要有一个 `name` 的 string 类型的成员。他确实有，所以可以赋值。检查函数调用参数也使用同样的赋值规则。

```ts
function greet(n: Named){
    alert(n: Named); 
}

greet(y); // OK
```

注意 `y` 有额外的 `location` 属性，但这并不会造成错误。

当检查兼容性时只考虑目标类型的成员 (这里是 `Named`).

这个比较过程递归进行，浏览每个成员及其子成员。

## Comparing two function

当比较基本类及对象类型时相对直接，什么类型的函数是兼容的这种问题有点复杂。

让我们先看一具基本的示例，两个只有参数列表有区别的函数：

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // ok
x = y; // error
```

要检查 `x` 是否可以赋给 `y`, 我们先看参数列表。

`x` 中的每个参数在 `y` 中必须都有对应的兼容性类型。

注意，不考虑参数名，只考虑类型。

这个示例中，`x` 中的每个参数在 `y` 中都有对应的兼容的类型，所以赋值是允许的。

第二个赋值是错误的，因为 y 有个必须的第二个参数，而 `x` 没有，所以不允许赋值。

你可能会好奇为什么像示例 `y = x` 可以丢掉参数。

允许这种赋值的原因是忽略额外的参数在 JavaScript 中是很常见的。// yes, it is

例如，`Array#forEach` 为回调函数提供3个参数：数组元素，元素索引，及包含元素的数组。

而提供只使用第一个参数是回调是非常有用的：

```ts
let items = [1, 2, 3];

// don't force these extra parameters
items.forEach((item, index, array) => console.log(item));

// should be ok
item.forEach(item => console.log(item));
```

现在让我们使用两个只有返回类型有区别的函数，看下返回类型是如何被对待的：

```ts
let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y; // OK
y = x; // Error because x() lacks a location property
```

类型系统强制源函数的返回类型是目标类型的返回类型的子类型。


## Function Parameter Bivariance

当比较函数参数类型时，原参数可赋给目标参数，或目标参数可赋给源参数都会使得赋值成功。

这样是不稳妥的，因为最后可能给调用者一个接收更多指定类型的参数，而却以更少指定的类型调用这个函数。

在实践中，这种错误是罕见的，允许这种错误使得可以使用很多常见的 JavaScript 模式。一个简单的示例：

```ts
enum EventType { Mouse, Keyboard };

interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Mouse, (e: number) => console.log(e));
```

## Optional Parameters and Rest Parameters

当比较函数兼容性时，可选和必须参数是不可交换的。

源类型额外的参数并非错误，目标类型的可选参数在源类型中没有对应的参数也不是错误。

当一个函数有剩余参数 (rest paramter) 时，被当作好像有无穷无尽的可选参数对待。

从类型系统的角度来看这是不稳妥的 (unsound), 但从运行时的角度来看通常并没有强制可选参数，因为对大多函数而言传递 `undefined` 也是一样的。

一个积极的例子是一个常见的模式，一个函数接收一个回调，然后以可预测 (对程序人员而言) 的参数调用这个回调，但并不知道 (对类型系统而言) 参数的数量：

```ts
function invokeLater(args: any[], callback: (...args: any[]) => void): void{
    /* invoke callback with 'ages' ... */
}

// unsound - invokeLater 'might' provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));

// 这种形式让人疑惑，x, y 是必须的，但却是未可知的
invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));
console.log('');
```

## Functions with overloads

当函数有重载时，源类型的每个重载在目标类型中必须有匹配的兼容签名。

## Enums

枚举兼容数字，数字兼容枚举。不同枚举类型的枚举值是不兼容的。如：

[enum.ts](./enum.ts)

```ts
enum Status {
    Ready,
    Waiting
}

enum Color {
    Red, Blue, Green
}

let status = Status.Ready;

//[ts] 不能将类型“Color.Red”分配给类型“Status”。
// status = Color.Red;

let n: number = status;
```

## Classes

类类似对象字面量和接口，但有一点区别。

当比较两个类类型的对象时，只比较实例成员。静态成员和构造函数不影响兼容性。// 好神奇

```ts
class Animal{
    feet: number;
    contstructor(name: string, numFeet: number){}
}

class Size{
    feet: number;
    constructor(numFeet: number){}
}

let a: Animal;
let s: Size;

a = s; // ok
s = a; // ok
```

## Private and protected members in classes

类的私有和受保护成员影响兼容性。

当检查类实例的兼容性时，如果目标类型包括私有成员，那么源类型也必须包含源于同个类的私有成员。对于受保护成员也是如此。

这使得类可赋给兼容的超类，而非源于不同继承层级有同样外形的类。

# Generics

因为 TypeScript 是一个结构化的类型系统，当作为成员类型的一部分使用时类型参数才影响结果类型。

```ts
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // okay, y matches structure of x
```

上面示例中，`x` 和 `y` 是兼容的，因为他们的结构并没有以有差异的方式使用类型参数。

```ts
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // error, x and y are not compatible
```

这里，指定类型参数的泛型就好非泛型类型一样。

对于没有指定类型参数的泛型类型，检查兼容性时会使用 `any` 替代所有未指定的类型参数。

结果类型稍后再用于检查兼容性，就像非泛型的情形一样。

```ts
let identity = function<T>(x: T): T{}

let reverse = function<U>(y: U): U{
    // ...
}

let identity = reverse; // ok becuse (x: any) => any matches (y: any) => any
```

# Advanced Topics

## Subtype vs Assignment

目前，我们使用的 'compatible' 并不是定义在语言规范中的术语。

在 TypeScript 中，有两种兼容性：subtype (子类型) 及 assignment (赋值). 两者的区别在于赋值扩展了子类型的兼容性，允许 `any` 及枚举与对应的数字值。

在不同的地方使用哪和机制取决于情形。

出于实际目的，类型兼容被赋值兼容支配，既使用在 `implements` 和 `extends` 语句中也是如此。详情见 [TypeScript spec](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md).

## Futher Reading

[subtyping](https://en.wikipedia.org/wiki/Subtyping)

#

structural subtyping