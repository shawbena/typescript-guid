# Intersection Types

交叉类型结合多个类型为一个。这使得你能将现有类型加在一起得到你需要的所有特色的一个单一类型。

如, `Person & Serializable & Loggable` 是一个 `Person` 和 `Seializable` 及 `Loggable`.

这意味着这个类型有三种类型的所有成员。

你大多见交叉类型用于混合及其他概念，不适合经典的面向对象的模型。(JavaScript 中有很多！)

下面这个示例展示怎样创建一个 mixin:

[index.ts](./index.ts)

```ts
function extend<T, U>(first: T, second: U): T & U{
	let result = <T & U>{};
	for(let id in first){
		(<any>result)[id] = (<any>first)[id];
	}
	for(let id in second){
		if(!result.hasOwnProperty(id)){
			(<any>result)[id] = (<any>second)[id];
		}
	}
	return result;
}

class Person{
	constructor(public name: string){

	}
}

interface Loggable {
	log(): void;
}

class ConsoleLogger implements Loggable {
	log(){
		// ...
	}
}

let jim = extend(new Person('Jim'), new ConsoleLogger());
let n = jim.name;
jim.log();
```

# Union Types

联合类型与交叉类型紧密相关，但用法不同。

偶尔，你会遇到一个库期望参数要么是 `number` 要么是 `string`.

如，下面的函数：

```ts
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
*/
function padLeft(value: strign, padding: any){
	if(typeof padding === 'number'){
		return Array(padding + 1).join(' ') + value;
	}
	if(typeof padding === 'string'){
		return padding + value;
	}
	throw new Error(`Expected string or number, got ${padding}.`);
}

padLeft('Hello world', 4); // returns "    Hello world"
```

问题是 `padLeft` 的参数 `padding` 是 `any` 类型。这意味着我们调用他可以既不传 `number` 也不传 `string`, 而 TypeScript 也不会说什么。

```ts
let indentedString = padLeft('Hello world', true); // passses at compile time, fails at runtime.
```

在传统的面向对象代码中，我们可能创建一个继承层次类型来抽象两种类型。虽然更加明确，但却有点过了。

好的是 `padLeft` 的原始版本参只传递基本值。那意味着用法是简单又简洁。

如果你只是尝试用一个已经存在某处的函数，新的方式也不会有帮助。

我们可以用 `union type` 表示 `padding` 参数，而非 `any`.

联合类型描述一个值可以是几个类型中的一个。

如果有一个联合类型的值，我们只能访问联合中所有类型公共的成员。

```ts
interface Bird{
	fly();
	layEggs();
}

interface Fish{
	swim();
	layEggs();
}

function getSamallPet(): Fish | Bird {
	//...
}

let pet = getSmallPet();
pet.layEggs(); //okay
pet.swim(); // errors
```

这里的联合类型有点棘手，习惯要花点直觉。

如果一个值的类型是 `A | B`, 我们能肯定的只能是 `A` 和 `B` 都有的成员。

这个示例中，`Bird` 有个 `fly` 的成员。我们不能确认一个 `Bird | Fish` 的变量有 `fly` 方法。如果变量在运行时是一个 `Fish`, 那调用 `get.fly()` 将会失败。

# Type Guards and Differentiating Types

联合类型用于模仿一个值可以覆盖联合类型接收的类型的情形。

假如当你需要明确知道什么时候是 `Fish` 怎么办？JavaScript 中区别两个可能值的做法是检查成员的存在性。记得我们之前说过，你只能访问联合类型成员都存在的成员。

```ts
let pet = getSmallPet();
// Each of these property accesses will cause an error
if(pet.swim){
	pet.swim();
}else if(pet.fly){
	pet.fly();
}
```

要让同样的代码可行，我们需要用类型断言：

```ts
let pet = getSmallPet();
if(<Fish> pet.swim){
	(<Fish>pet).swim();
}else{
	(<Bird>pet).fly();
}
```

## User-Defined Type Guard

注意我们不得不用几次类型断言。如果我们执行了类型检查，我们可能会知道每个分支的 `pet` 类型，这样会更好些。

这样的事常常发生，所以 TypeScript 有 `type gurad`. Type Guard 是一个表达式，他执行运行时检查，确保在某个作用域中是某种类型。要定义一个 type guard, 只需要定义一个返回类型是 `type predicate` 的函数：

[user-defined-type-gurards](./user-defined-type-guards/index.ts)

```ts
funciton isFish(pet: Fish | Bird): pet is Fish{
	return (<Fish>pet).swim !== undefined;
}
```

`pet is Fish` 是我们这个示例中的 type predicate.

一个 predicate 是 `parameterName is Type` 这样的类型，`parameterName` 必须是当前函数签名中的一个参数名。

任何时候以一些变量调用 `isFish`, 如果源类型兼容，TypeScript 将缩窄那个变量至特定的类型。

```ts
// Both calls to 'swim' and 'fly' are now okay

if(isFish(pet)){
	pet.swim();
}else{
	pet.fly();
}
```

注意 TypeScript 不仅知道 `if` 分支中 `pet` 是 `Fish`, 也知道 `else` 分支中 `pet` 不是 `Fish` 所以是 `Bird`.

## `typeof` type gurards

让我们使用联合类型重写一下 `padLeft` 的例子。用上以下 type predicates

```ts
function isNumber(x: number): x is number{
	return typeof x === 'number';
}

function isString(x: any): x is string{
	return typeof x === 'string';
}

function padLeft(value: string, padding: string | number){
	if(isNumber(padding)){
		return Array(padding + 1).join(' ') + value;
	}
	if(isString(padding)){
		return padding + value;
	}
	throw new Error(`Expected string or number, got '${padding}'.`);
}
```

然而定义一个函数计算一个类型是一个基本类型这也太简单了。幸运的是，我们不需要抽象 `tyepof x === 'number'` 成自己的函数，因为 TypeScript 能识别他本身就是 type gurad.

这意味着我们可以只写内联检测就可以。

[typeof-type-guards](./typeof-type-guards/index.ts)

```ts
function padLeft(value: string, padding: string | number){
	if(typeof padding === 'number'){
		return Array(padding + 1).join(' ') + value;
	}
	if(typeof padding === 'string'){
		return padding + value;
	}
	throw new Error(`Expected string or number, got '${padding}'.`);
}
```

这些 `typeof` type gurads 的两种形式可以被识别：`typeof v === 'typename'` 及 `typeof v !== 'typename'`, `typename` 必须是 `"number"`, `"string"`, `"boolean"` 或 `"symbol"`。虽然 TypeScript 不会阻止你比较其他字符串，只是不会将这些表达式视为 type guards.

## `instanceof` type guards

如果你已读过 `typeof` type guards 而且熟悉 JavaScript 中的 `instanceof` 操作符，你可能对本节要讲的有点概念。

`instanceof` type guards 是使用类的构造函数缩窄类型的一种方式。如下示例：

[instanceof-type-guards](./instanceof-type-guards/index.ts)

```ts
interface Padder {
	getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
	constructor(private numSpaces: number){

	}
	getPaddingString(): string {
		return Array(this.numSpaces + 1).join(' ');
	}
}

class StringPadder implements Padder{
	constructor(private value: string){}
	getPaddingString(): string {
		return this.value;
	}
}

function getRandomPadder(){
	return Math.random() < 0.5 ? new SpaceRepeatingPadder(4) : new StringPadder('    ');
}

let padder: Padder = getRandomPadder();

if(padder instanceof SpaceRepeatingPadder){
	padder; // type narrowed to 'SpaceRepeatingPadder'
}

if(padder instanceof StringPadder){
	padder; // type narrowed to 'StringPadder'
}
```

`instanceof` 右侧要是一个构造函数，TypeScript 将会按顺序缩窄至：

1. 函数 `prototype` 属性的类型，如果类型不是 `any`

2. 类型构造函数签名返回的联合类型

# Nullable types

TypeScript 有两种特殊的类型，`null` 和 `undefined`, 相应地有 null 和 undefined 值。这些我们在 [the Basic Types section](/basic-type/) 提及过。

默认类型检查器认为 `null` 和 `undefined` 可赋给任何类型。实际上 `null` 和 `undefined` 是任何类型的有效值。那意味着即使你相阻止他们不让他们赋给任何值那也是不可能的。`null` 的发明者，Tony Hoare, 称 null 是 ["billion dollar mistake"](https://en.wikipedia.org/wiki/Null_pointer#History).

`--strictNullChecks` 标志修复了这个：当你声明一个变量时，他不能自动包括 `null` 或 `undefined`.

你可以使用联合类型显式地包含他们：

[nullbale-type](./nullable-types/index.ts)

```ts
let s = 'foo';
s = null; // error, 'null' is not assignable to 'string'
let sn: string | null = 'bar';
sn = null;

sn = undefined; // error, 'undefined' is not assignable to 'string | null'
```

注意为了匹配 JavaScript 句意，TypeScript 不同地对待 `null` 和 `undefined`. `string | null` 与 `string | undefined` 和 `string | undefined | null` 不同。

## Optional parameters and properties

有 `--strictNullChecks`, 一个可选参数自动添加 `| undefine`:

[optional parameters](./nullable-types/optional-parameters.ts)

```ts
function f(x: number, y?: number){
	return x + (y || 0);
}

f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error 'null' is not assignable to 'number | undefined'
```

可选属性也是如此：

```ts
class C{
	a: number,
	b? number;
}

let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 12;
c.b = undefined; // ok
c.b = null; //error, 'null' is not assgnable to 'number | undefined'
```

## Type guards and type assertions

因为 nullable 类型用枚举实现，你河以使用 type guard 摆脱 `null`.

幸运的是，这和 JavaScript 中的代码差不多：

```ts
function f(sn: string | null): string{
	if(sn === null){
		return 'default';
	}else{
		return sn;
	}
}
```

这里 `null` 的消除相当明显，但你可以使用更简洁的操作：

```ts
function f(sn: string | null): string{
	return sn || 'default';
}
```

对于编译器不能移除 `null` 或 `undefined` 的情形，你可以使用类型断言操作手动移除他们。

语法是 `!`: `identifier!` 从 `identifier` 中移除 `null` 及 `undefined`:

```ts
function broken(name: string | null): string{
	function postfix(epithet: string){
		return name.charAt(0) + '. the ' + epithet; // error, 'name' is possibly null
	}
	name = name || 'Bod';
	return postfix('great');
}

function fixed(name: string | null): string{
	function postfix(epithet: string){
		return name!.charAt(0) + '. the ' + epithet; // ok
	}
	name = name || 'Bob';
	return postfix('great');
}
```

这个示例使用了一个嵌套函数，因为编译器不能消除嵌套函数中的 nulls (立即调用函数表达式除外)

那是因为他不能追踪所有的嵌套函数调用，尤其是从外层返回的。

不知道函数在哪里调用，也不能知道函数体执行时 `name` 的类型。

# Type Aliases

类型别名为一个类型创建新名称。类型别名类似接口，但可以命名，基本类型，联合，元组，及其他你不相手写的类型。

[type-aliases](./type-aliases/index.ts)

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name{
	// (parameter) n: string | (() => string)
	if(typeof n === 'string'){
		// (parameter) n: string
		return n;
	}

	// (parameter) n: () => string
	return n();
}
```

别名实际上并不创建新类型 - 他创建一个引用那个类型的新名称。

别名基本值并不咋有用，作为一种文档形式倒是可以。

和接口一样，类型别名也可以有泛型 - 我们只需添加类型参数并在别名声明右侧使用他们：

```ts
type Container<T> = { value: T };
```

也可以有属性中是自身的类型别名：

```ts
type Tree<T> = {
	value: T;
	left: Tree<T>;
	right: Tree<T>;
}
```

用交叉类型，我们可以制作相当复杂难以记忆的类型：

```ts
type LinkedList<T> = T & { next: LinkedList<T>};

interface Person{
	name: string
}

var people: LinkedList<person>
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```

然而，一个类型别名出现在声明右侧的别里都是不可以的。

```ts
type Yikes = Array<Yikes>;
```

## Interfaces vs. Type Aliases

正如我们前面提到的，类型别名与接口有几分相似，然而还是有些不同的。

区别之一是接口创建一个到处可用的新名称。类型别名不创建新名称——如，错误消息不使用类型别名。下面的代码中，在编辑器中悬停在 `interfaced` 上显示他返回 `Interface`, 但 `aliased` 显示返回一个对象字面量。

第二个重要的区别是不能扩展或实现类型别名 (类型别名也不能扩展或实现其他类型).

因为 [an ideal property of software is being open to extension], 你应尽可能使用接口而非类型别名。

另一方面，如果你不能以接口表达一些形状或者需要使用联合类型或元组类型，通常类型别名是你的选择。

# String Literal Types

字符串字面量类型允许你指定一个字符串必须要有的精确的值。实际上，字符串字面量类型和联合类型，type guards 及类型别名结合的很好。你可以将这些特色用在一起得到类似枚举的字符串。

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
class UIElement {
	animate(dx: number, dy: number, easing: Easing){
		if(easing === 'ease-in'){
			//...
		}else if(easing === 'ease-out'){

		}else{
			// error! should not pass null or undefined.
		}
	}
}

let button = new UIElement();
button.animate(0, 0, 'ease-in');
button.animate(0, 0, 'uneasy'); // error: "uneasy" is not allowed here
```

三个允许的字符串传递哪个都可以，但其他字符串会报错。

```bash
Argument of type '"uneasy"' is not assignable to parameter of type '"ease-in" | "ease-out" | "ease-in-out"'
```

字符串字面量类型可用于区分重载：

```ts
function createElement(tagName: 'img'): HTMLImageElement;
function createElement(tagName: 'input'): HTMLInputElement;
// ... more overloads
function createElement(tagName: string): Element {
	// ... code goes here ...
}
```

# Discriminated Unions

你可以结合字符串字面量类型，联合类型，type guards 及类型别名以构建一个高级的模工叫 `discriminated unions` (判别式联合体) 或也叫 `tagged unions` 或 `algebraic data types`

判别式元组在函数式编程中有用。一些语言自动为你判别联合体。TypeScript 基于已存在的 JavaScript 模式。

这里有三个要素：

1. 类型有一个共同的，字符串字面量属性 —— 判别式。

2. 类型别名接收这些类型的联合 —— 联合体

3. 共同属性的 type guards

```ts
interface Square{
	kind: 'square';
	size: number;
}

interface Rectangle{
	kind: 'rectangle';
	width: number;
	height: number;
}

interface Circle {
	kind: 'circle';
	radius: number;
}
```

首先，声明要用于联合体的接口。每个接口都有一个有不同字符串字面量类型的 `kind` 属性。

`kind` 属性叫 `discriminant` 或 `tag`.

其他属性是其他接口特定的。

注意，当前这些接口是无联系的。

让我们用联合把他们放在一起：

```ts
type Shape = Square | Rectangle | Circle;
```

现在，让我们用判别式联合：

```ts
function area(s: Shape){
	switch(s.kind){
		case 'square': return s.size * s.size;
		case 'rectangle': return s.height * s.width;
		case 'circle': return Math.PI * s.radius * 2;
	}
}
```

## Exhaustiveness checking

当如果我们没有覆盖判别式联合的所有类型，我们想让编译器告诉我们。

例如，如果给 `Shape` 添加 `Triangle`, 我们也要更新 `area`:

```ts
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}
```

有两种解决方法。

一是打开 `--strictNullChecks` 并指定一个返回类型：

```ts
function area(s: Shape): number { // error: returns number | undefined
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

因为 `switch` 不再详尽，TypeScript 意识到这个函数可能会有时返回 `undefined`.

如果有明确的返回类型，那么你将得到一个错误，即返回类型实际上可能是 `number | undefined`.

而这种方法并不明显，而且，`--strictNullChecks` 也不能用于老代码。

第二种方法是使用 `never` 类型来检查有穷性：

[exhaustiveness-checking2](./discrimated-unions/exhaustiveness-checking.ts)

```ts
import assertNever from '../../utils/assert-never';

interface Square{
	kind: 'square';
	size: number;
}

interface Rectangle {
	kind: 'rectangle';
	width: number;
	height: number;
}

interface Circle {
	kind: 'circle';
	radius: number;
}

interface Triangle{
	kind: 'triangle';
	sideA: number;
	sideB: number;
}

type Shape = Square | Rectangle | Circle | Triangle;

function area(s: Shape): number{
	switch(s.kind){
		case 'square': return s.size * s.size;
		case 'rectangle': return s.height * s.width;
		case 'circle': return Math.PI * s.radius * 2;
		case 'triangle': return s.sideA * s.sideB / 2;
		default: return assertNever(s);
	}
}
```

这里`assertNever` 检查 `s` 是 `never` 类型 —— 移除所有类型剩下的类型。

如果你忘记了一个情形，那 `s` 将有一个真正的类型而你会得到一个错误。

这个方法要你定义一个额外的函数，但你忘了的话更加明显。

# Polymorphic `this` types

一个多态 `this` 类似表示包含类或接口的子类型。

这叫 F-bounded polymorphism.

这使得层次的流接口 (fluent interfaces) 更容易表达，如。

一个每次操作后返回 `this` 的简单计算器：

[BasicCalculator](./polymorphic-this-types/BasicCalculator.ts)

```ts
export default class BasicCalculator{
	public constructor(protected value: number = 0){}
	
	public currentValue(): number{
		return this.value;
	}

	public add(operand: number): this{
		this.value += operand;
		return this;
	}

	public multiply(operand: number): this{
		this.value *= operand;
		return this;
	}

	// ... other operations go here ...
}

let v = new BasicCalculator(2)
				.multiply(5)
				.add(1)
				.currentValue();
```

因为这个类使用 `this` 类型，你可以扩展他并且新类不用改变可以使用老的方法。

[pluck.js](./index-types/pluck.js)

```ts
import BasicCalculator from './BasicCalculator';

class ScientificCalcalutor extends BasicCalculator{
	public constructor(value = 0){
		super(value);
	}

	public sin(){
		this.value = Math.sin(this.value);
		return this;
	}

	//... other operations go here ...
}

let v = new ScientificCalcalutor(2)
				.multiply(5)
				.sin()
				.add(1)
				.currentValue();

```

没有 `this` 类型，`ScientficCalculator` 将无法扩展 `BasicCalculator` 而又保持流接口。`multiply` 可能返回 `BasicCalculator`, 并没有 `sin` 方法。

然而，有了 `this` 类型，`multiply` 返回 `this`, 在这里是 `ScientficCalculator`.

# Index types

使用索引类型，你可以让编译器检查使用动态属性名的代码。

如，一个常见的 JavaScript 模式是从一个对象中选一个属性集：

```ts
function pluck(o, names){
	return names.map(n => o[n]);
}
```

这里你可以以 TypeScript 这样写， 使用 index type query 及 indexed access 操作符：

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]):T[K][]{
	return names.map(n => o[n]);
}

interface Person{
	name: string;
	age: number;
}

let person: Person = {
	name: 'Jarid',
	age: 35
};

let strings: string[] = pluck(person, ['name']); // ok, string[]
```

编译器检查 `name` 实际上是 `Person` 的一个属性。

这个示例引入了几个新的类型操作符。

首选是 `keyof T`, `index type query operator`.

对于任何类型的 `T`, `keyof T` 是 `T` 的已知的公开的属性名的联合体。

例如：

```ts
let personProps: keyof Person; // 'name' | 'age'
```

`keyof Person` 与 `name | 'age'` 是完全可替换的。

区别是如果你给 `Person` 添加了另一个属性，假如是 `address: string`, 那 `keyof Person` 将自动更新为 `'name' | 'age' | 'address'`

你可以在像 `pluck` 这样的泛型语境中使用 `keyof`, 但你不能提前知道属性名。

这意味着编译器将检查你给 `pluck` 传递正确的属性名集合：

```ts
pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
```

第二个操作符是 `T[K]`，`indexed access opeartior`.

这里，类型语法返映表达式语法。

这意味着 `person['name']` 的类型 `Person['name']` —— 在你这个示例中只是 `string`.

然而，就像 index type queries，你可以在泛型语境中用 `T[K]`, 这是其逼真的强大能力所在。

你只需要确何类型变量 `K extends keyof T`.

这里是一个名为 `getProperty` 的另一个函数的示例。

```ts
function getProperty<T, K extends keyof T>(o: T, name: K): T[K]{
	return o[name]; // o[name] is of type T[K]
}
```

在 `getProperty` 中 `o: T` 且 `name: K`，所以意味着 `o[name]: T[K]`.

一旦你返回了 `T[K]` 结果，编译器将实例化键的真实类型，所以 `getProperty` 返回类型将根据你请示的属性变化。

```ts
let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error, unknown is not in 'name' \ 'age'
```

## Index types and string index signatures

`keyof` 和 `T[K]` 与字符串索引签名互相影响。

如果你有一个字符串索引签名的类型，`keyof T` 将会是 `string`.

`T[string]` 就是索引签名类型。

# Mapped types

一个常见的任务是把一个现有类型的每个属性变成可选的：

```ts
interface PersonPartial{
	name?: string;
	age? number;
}
```

或者我们想要一个只读的版本：

```ts
interface PersonReadonly{
	readonly name: string;
	readonly age: number;
}
```

JavaScript 中经常出现这样的事，TypeScript 提供一种基于旧类型创建新类型的方式 —— mapped types (映射类型).

在映射类型中，亲的类型以同样的方式转换老类型中的每个属性。

例如，你可以使所有属性的类型为 `readonly` 或可选的。

这里有几个示例：

```ts
type Readonly<T> = {
	readonly [P in keyof T]: T[P];
}

type Partial<T> = {
	[P in keyof T]?: T[P];
}
```

并且使用：

```ts
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

让我们看下最简单的映射的类型及其部分：

```ts
type Keys = 'optional1' | 'option2';
type Flags = { [K in keys]: boolean};
```

这种语法有点像里面有 `for .. in` 的索引签名语法。

这里有三个部分：

1. 类型变量 `K`, 轮流绑定每个属性。

2. 字符串字面量联合体 `Keys`, 包含要遍历的属性名。

3. 属性的结果类型。

在这个简单示例中，`Keys` 是一个硬编码的属性名列表，属性类型总是 `boolean`, 所以映射的类型等同于这样写：

```ts
type Flags = {
	option1: boolean;
	option2: boolean;
}
```

真正的应用中，然而，像上面的 `Readonly` 或 `Partial`. 他们基于现有的类型，并且他们以同样的方式转换域。

这里正好要用到 `keyof` 及索引访问类型：

```ts
type NullablePerson = { [P in keyof Person]: Person[P] | null };
type PartialPerson = { [P in keyof Person]?: Person[P] };
```

但泛型版本的更有用些：

```ts
type Nullable<T> = { [P in keyof T]: T[P] | null };
type Partial<T> = { [P in keyof T]?: T[P] }
```

在这些示例中，属性列表是 `keyof T` 及结果类型是 `T[P]`.

这是任何映射的类型的通用用法的好模板。

那是因为这种转换是[同态的](https://en.wikipedia.org/wiki/Homomorphism, 这意味着映射只适用于 `T` 的属性没有其他。

编译器知道在添加新项前他可以拷贝所有现有的属性修饰符。

例如，如果 `Person.name` 如果是 `readonly`, `Partial<Person>.name` 将会是只读的且可选的。

这里还有一个示例，`T[P]` 包裹在 `Proxy<T>` 类中:

```ts
type Proxy<T> = {
	get(): T;
	set(value: T): void;
}

type Proxify<T> = {
	[P in keyof T]: Proxy<T[P]>
}

function proxify<T>(o: T): Proxify<T>{
	// ... wrap proxies ...
}

let proxyProps = proxify(props);
```

注意 `Readonly<T>` 及 `Partial<T>` 是如此有用，所以他们和 `Pick` 及 `Record` 一起包含在了 TypeScript 的标准库中。

```ts
type Pick<T, K extends keyof T> = {
	[P in K]: T[P];
}

type Record<K extends string, T> = {
	[P in K]: T;
}
```

`Readonly<T>` 和 `Partial<T>` 是同态的而 `Record` 不是。

`Record` 不是同态的是因为他不接收可用于从中拷贝属性的输入类型：

```ts
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
```

创建新属性，非同态类型是必要的，所以他们不从哪里拷贝属性修饰符。

## Inference from mapped types

既然你已知道如何包裹一个类型的属性，接下来你相做的是拆开包裹。

幸运的是，这相当简单：

```ts
function unproxify<T>(t: Proxify<T>): T{
	let result = {} as T;
	for(const k in t){
		result[k] = t[k].get();
	}
	return result;
}

let originalProps = unproxify(proxyProps);
```

注意拆包裹推断只用于同态映射的类型。

如果映射的类型不是同态，你的拆包裹函数将得到一个明确的类型参数。