# Generics

软件工程的一个主要部分是不仅要构建定义良好和 APIs 一致的组件，但也要构建可重用的组件。

能处理今天数据也参处理明天数据的组件给你构建大型软件系统最大灵活性的能力。

在其他语言如 C# 和 Java 中，工具箱中创建可重用组件的重要工具是泛型，即创建能用于多种类型而非一个单一类型的组件。这使得用户可以用他们自己的类型使用组件。

## Hello World of Generics

让我们以一个 "hello world" 泛型开始：身份函数。无论你传什么，身份函数都将其返回。你可以把他考虑为类似的 `echo` 命令。

没有泛型，我们要么给身份函数一个特定的类型：

```ts
function identity(arg: number):number{
	return arg;
}
```

要么用 `any` 类型描述这个身份函数：

```ts
function identity(arg: any): any{
	return arg;
}
```

`any` 当然是 "泛型" 啦，但我们丢失了函数返回类型的信息。如果传了一个数字，我们得到的唯一信息是返回了 `any` 类型。

而是，我们需要一种捕获参数类型的方式，这样我们可以描述返回了什么。

这里，我们使用一个类型变量，用于类型而不是值的特殊变量。

__./index.ts__

```ts
function identity<T>(arg: T): T {
	return arg;
}
```

现在我们添加了一个类型 `T` 来标识身份函数。这个 `T` 使得我们能捕获用户提供的类型 (如，`number`)，因些我们稍后就可以使用这个信息。这里我们再次使用 `T` 作为返回类型。通过观察，我们现在可以看见同样的类型用作能数和返回类型。

这使得我们在函数中沟通类型信息。

我们说这个版本的 `identity` 函数是泛型的，他可用于一大片类型。不像用 `any`，他和使用数字作为参数和返回类型的第一个 `identity` 函数一样精确 (如，不丢失任何信息)。

一旦写好了泛型身份函数，我们可以以两种方式调用他。

一是传递所有参数，包括类型参数：

```ts
let output = identity<string>('myString'); // type of output will be 'string'
```

这里我们明显地将 `T` 设置为 `string` 作为参数之一传递给函数调用，使用 `<>` 包括参数而非 `()`.

第二种方式或许是最常见的。这里我们用类型参数推断——即我们让编辑器基于我们传递的参数的类型自动设置 `T` 的值：

```ts
let output = identity('myString'); // type of output will be 'string'
```

注意我们并没有在角括号中明确传递类型，编译器只查找下 `myStirng` ，并 `T` 设为他的类型。虽然类型推断有助于保持代码简洁和可读，但编译器无法推断类型中你仍然可能需要像之前例子中那样传递类型参数，更复杂的例子可能会出现这样的情况。

## Working with Generic Type Variables

当你开始用泛型时，你将注意到当你创建像 `identity` 这样的泛型函数时，编译器将强制你在函数体内使用正确的类型参数。即，实际上你像对待所有类型那样对待这些参数。

让我们用之前的 `identity` 例子：

```ts
function identity<T>(arg: T): T{
	return arg;
}
```

如果每次调用我都想打印参数 `arg` 的长度呢？

我们可能会尝试着这样写：

```ts
function loggingIdentity<T>(arg: T): T {
	console.log(arg.length);	// Error: T doesn't have .length
	retur arg;
}
```

这样做，编译器会给我们一个错误，我们使用了 `arg` 的 `.length`, 但我们从未说过 `arg` 有这样的成员。

记得，我们之前说过，这些类型变量表示任何和所有类型，所以使用这个函数的人可以传递 `number`，但 `number` 并没有 `.length` 属性。

假设我们实际上想让这个函数用于 `T` 类型的数组而不是直接用于 `T`. 由于我们处理的是数组，`.length` 属性应该是可用的。我们将这描述为就像我们创建了其他类型的数组一样：

```ts
function loggingIdentity<T>(arg: T[]): T[]{
	console.log(arg.length); // Array has a .length, so no more error
	return arg;
}
```

我们可以把 `loggingIdentity` 的类型读作 "泛型函数 `loggingIdentity` 函数接收一个类型参数 `T`, 有一个数组类型 `T` 的参数 `arg`, 并返回一个 `T` 数组". 如果我们传递一个数字数组，我们得到一个返回的数字数组，`T` 会绑定至 `number`.

这使得我们可以使用泛型变量 `T` 作为部分我们使用的类型，而不是整个类型，这给我们很大的灵活性。我们也可以这样写这个示例：

```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
	console.log(arg.length); // Array has a .length, so no more error
	retur arg;
}
```

你可能熟悉过其他语言中这种类型的风格。下面，我们将讲下怎样创建像 `Array<T>` 样的自己的泛型类型。

## Generic Types

前面，我们创建了适用于一大片类型的泛型身份函数。这里，我们将探索下函数本身的类型及怎样创建泛型的接口。

泛型函数的类型就像那些非泛型函数一样，类型参数列在前面，类似于函数声明：

```ts
function identity<T>(arg: T): T {
	return arg;
}

let myidentity: <T>(arg: T) => T = identity;
```

我们也可以用不同的名称表示泛型类型参数，只要类型变量的数量及使用队齐即可：

```ts
function identity<T>(arg: T): T {
	return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

我们也可以将泛型类型写为对象字量类型的调用签名：

```ts
function identity<T>(arg: T) : T{
	return arg;
}

let myIdentity: {<T>(arg: T): T} = identity;
```

让我们用前个示例的对象字面并将他移到接口中：

```ts
interface GenericIdentityFn{
	<T>(arg: T): T;
}

function identity<T>(arg: T): T {
	return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

我们可能想要将泛型参数移至整个接口的一个参数。让我们看下我们泛型的类型 (如 `Dictionary<string>` 而非 `Dictionary`). 这使得类型参数对接口的所有其他成员可见。

```ts
interface GenericIdentityFn<T>{
	(arg: T): T;
}

function identity<T>(arg: T): T {
	return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

注意我们的示例已经变得有点不同了。现在我们有了一个是泛型类型一部分的非泛型函数签名，而不是在描述一个泛型函数。现在当我们使用 `GenericIdentityFn`, 我们将也需要指定对应的类型参数 (这里是：`nunber`), 有效地锁定我们使用的底层调用签名。

更解何时将类型参数直接放在调用签名，何时放在接口本身上，有助于描述一个类型的哪里方面的泛型的。

除了泛型接口，也可以创建泛型类。注意，不能创建泛型枚举和泛型名称空间。

## Generic Classes

泛型类有类似泛型接品的形状。泛型类在类名后的角括号中有一个泛型类型列表。

```ts
class GenericNumber<T>{
	zeroValue: T;
	add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y){ return x + y; };
```

这里 `GenericNumber` 类一个相当直接的用法，但你可能注意到了并没有限制你使用 `number` 类型。我们可以使用 `string` 或甚至更复杂的类型。

```ts
let stringNumeric = new GenericNumber<string>();
stringNumberic.zeroValue = '';
stringNumberic.add = function (x, y){ return x + y; };
alert(stringNumeric.add(stringNumeric.zeroValue, 'test'));
```

像接口一样，把类型参数放在类本身上使得我们确保类的所有属性用于同一类型。

我们在 [classes 章节](/classes/) 讲过，一个类类型有两个面：静态和实例。泛型类只在实例侧泛型而非静态侧，当处理类时，静态成员不能使用类的类型参数。//使用哪个好呢

## Generic Constraints

如果你记得之前的例子，你可能有时想写一个用于一些类型函数，而你只知道这些类型的一些能力。在 `loggingIdentity` 示例中，我们想要访问 `arg` 属性的 `.length` 属性，但编译器不能证明每个类型都有 `.length` 属性，所以他警告我们不能这样假设。

```ts
function loggingIdentity<T>(arg: T): T{
	console.log(arg.length); // Error: T doesn't have .length
	return arg;
}
```

我们可以绝束这个函数让他适用于任何和所有有 `.length` 属性的类型。只要有这个成员的类型，我们就允许他，但要求至少有这个成员。//如果泛型约束为某个类型，还叫泛型吗

要这么做，我们必须列出我们对 T 的要求。我们创建下个接口描述我们的约束。这里我们创建了一个只有 `.length` 的接口，然后我们将使用这个接口和 `extends` 关键字表示我们的约束：

```ts
interface LengthWise{
	length: number;
}

function loggingIdentity<T extends LengthWise>(arg: T): T {
	console.log(arg.length); // Now we know it has a .length property, so no more error
	return arg;
}
```

因为泛型函数现在有约束，他将不再用于任何和所有类型：

```ts
loggingIdentity(3); // Error, number doesn't have a .length property
```

而是，我们要传递有所有要求的属性的类型的值：

```ts
loggingIdentity({length: 10, value: 3});
```

## Using Type Parameters in Generic Constraints

你也可以声明一个类型参数被另一个类型参数约束。例如，给定一个属性名，我们获得一个对象的属性。

我们想确保不意外地抓取对象 `obj` 上不存在的属性，所以我们将在两个类型之间放置约束：

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K){
	return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, 'a'); // okay
getProperty(x, 'm'); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'
```

## Using Class Types in Generics

当在 TypeScript 中用泛型创建工厂时，需要根据类的构造函数指定类的类型。如：

```ts
function create<T>(c: {new(): T }): T {
	return new c();
}
```

一个高级的示例使用原型属性推断和约束构造函数与类类型实例部分的约束。

```ts
class BeeKeeper{
	hasMask: boolean;
}

class ZooKeeper{
	nametag: string;
}

class Animal{
	numLegs: number;
}

class Bee extends Animal{
	keeper: BeeKeeper;
}

class Lion extends Animal{
	keeper: ZooKeeper;
}

function createInstnace<A extends Animal>(c: new () => A): A{
	return new c();
}

createInstnace(Lion).keeper.nametag;
createInstnace(Bee).keeper.hasMask;
```