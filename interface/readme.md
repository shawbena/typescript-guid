# Interfaces

TypeScript 的核以原则之一是类类检查关注值所有的 *shape*. 

有时这叫 "duck typing" 或 "structural subtyping". 

在 TypeScript 中，接口扮演着命名这些类型的角色，也是定你代码中及与你项目外代码合同的强有力方式。

## Our First Interface

看接口是如何工作的最简单方式是以一个简单的例子为开端：

__./index.ts__

```ts
function printLabel(labelledObj: { label: string }){
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
```

类型检查者检查对 `printLabel` 的调用。`printLabel` 函数有一个参数，要求传入的参数有一个字符串类型的 `label` 属性。

实际上我们的对象有更多的属性，但编译器只检查至少需要的存在，且是需要的类型。也有一些情形 TypeScript 不那么仁慈，我也也会讲一点的。

再次使用同一例子，这次我们用接口描述我们需要字符串类型的 `label` 属性：

__./print-label-2/index.ts__

```ts
interface LabelledValue{
    label: string;
}
function printLabel(labelledObj: LabeledValue){
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
```

接口 `LabelledValue` 是一个名子，我们现在使用他描述我们前面例子的需求。他仍然表示有一个叫 `label` 类型为字符串的单个属性。我们不必明确地说我们传递给 `printLabel` 的对象像其他语言中那样实现了这个接口，这里仅仅形 (shape) 是重点。如果我们传第给函数的对象满足了列出的需求，就是允许的。

值得指出类型检查者不要求这些属性以什么顺序出现，只要接口要示的属性有且是要的类型就可以。

## Optional Properties

并非接口中的所有属性都是需要的。一些存在于某些情形或可能一点也不在此。当你创建如 "可选包包" 这样的模式，你给函数传递一个对象里面只有几个属性，这时可选属性很流行：

这有一个这种模式的例子：

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number }{
    let newSquare = { color: "white", area: 100 };
    if(config.color){
        newSquare.color = config.color;
    }
    if(config.width){
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

有可选属性的接口的写法和其他接口相似，声明中在每个可选属性属性名后面用一个 `?` 表示。

可选属性的优势是你可以描述这些可能可用的属性然而也防止使用不是接口的属性。如，假如我们将 `createSquare` 中的 `color` 属性打错了，我们会得到错误的提示信息让我们知道：

```ts
interface SquareConfig{
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number }{
    let newSquare = { color: 'white', area: 100 };
    if(config.color){
        //Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.clor;
    }
    if(config.width){
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: 'black' });
```

## Readonly properties

一些属性只应该在对象首次创建时修改。你可以在属性名前放 `readonly` 来指定这样的属性：

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
```

你可以通过赋一个对象字面量来构造一个 `Point`. 赋值之后，`x` 和 `y` 不能改变。

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5; //error!
```

TypeScript 有 `ReadonlyArray<T>` 类型和 `Array<T>` 一样，只是移除了修改方法。所以你可以确保在数组创建后你不能更改你的数组。

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; //errror
ro.push(5); //error
ro.length = 100;//error
a = ro; //error!
```

最后一行代码你可以看到即使将整个 `ReadonlyArray` 数组赋回正常数组也是不合法的。然而你可以用类型断言：

```ts
a = ro as number[];
```

### `readonly` vs `const`

最简单的方式记住要用 readonly 还是 const 是问下自己，你是要用于变量还是用于属性。变量用 `const` 而属性用 `readonly`.

## Excess Property Checks

使用接口的第一个例子 TypeScript 让我们传递 `{ size: number; label: string; }` 给期望 `{ label: string; }` 的。我们刚也学了可选属性，当描述如 "option bags" 是多么有用。

然而幼稚地将两者给合起来却是搬起石头砸自己的脚。如拿上个用 `createSquare` 的例子：

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number; }{
    //...
}
let mySquare = createSquare({ colour: 'red', width: 100 });
```

注意给 `createSquare` 的参数拼成了 `colour` 而非 `color`.  在JavaScript 中，这种静默地失败。

可能你要争论，程序是正确键入的，因为 `width` 属性兼容，也没有 `color` 属性，额外的 `colour` 属性是微不足道。

而 TypeScript 的立场是代码中可能会有 bug. 

对象字面量得到特殊对待并且当赋给其他变量或做为参数传递时要执行属性检查，如果一个对象字面量有任何目标类型没有的属性，你将得到一个错误。// 试着用字面量初始化某个类型的变量

```ts
//error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: 'red', width: 100 });
```

绕过这些检查实际上真的很简单。最简单的方式是用类型断言：

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig) ;
```

然而更好的方式是添加一个字符串索引签名，如果你确定对象可以有用额外的属性。如果 `SquareConfig` 可以有以上类型的 `color` 和 `width` 属性，但也有任意数量的其他属性，那我们可以这样定义：

```ts
interface SquareConfig{
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

我们会讨论一点索引签名，但这里我们说 `SquareConfig` 可以有任意数量的属性，只要不是 `color` 或 `width`, 他们的类型就不重要。

绕过属性检查的最后一种方法，你可能会感到有点小吃惊，将对象赋给另一个变量：

由于 `squareOptions` 不经历属性检查，编译器不会给你错误。

```ts
let squareOptions = { colour: 'red', width: 100 };
let mySquare = createSquare(squareOptions);
```

记住对于像上面简单的代码你不应该绕过这些检查。对于更复杂的对象字面量，有方法和存放状态，你可能要将这些技术记在心中，但是越过属性检查的实际上大部分都是 bugs. 这意味着如果你遇到了执行属性检查的问题如可选的包包，可能你需要修改一下你的类型声明。这个例子中，如果传递 `color` 和 `colour` 属性给 `createSquare` 都可以，你应该修复下 `SquareConfig` 定义反映出来。

## Function Types

接口能描述 JavaScript 对象可接受的很广泛围的类型。除了描有属性的对象，接口也能描述函数类型。

用接口描述函数类型，我们给接口一个调用签名。这类似函数声明，但只给出参数列表和返回类型。参数列表中的每个参数要有名称和类型。

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

一旦定义之后，我们可以像用其他接口那样用这个函数类型接口。这里我们给你展示怎样创建一个函数类型的变量，并给他赋一个同类型的函数值。

```ts
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string){
    let result = source.search(subString);
    return result > -1;
}
```

函数的类型执行类型检查，参数名并不需要匹配。我们可以把上面的代码写成下面这样的：

```ts
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean{
    let result = src.search(sub);
    return result > -1;
}
```

Function parameters are checked one at a time, with the type in each corresponding parameter position checked against each other. 

如果你压根就不想指定类型，TypeScript 上下文键入可以推断参数类型，因为函数值直接赋给了 `SearchFun` 类型的变量。

这里我们函数表达式的返回类型也由他返回的值暗示 (here `true` an `false`). 

假如函数表达式返回数字或字符串，类型检查者会警告我们返回类型不匹配 `SearchFunc` 接口中描述的返回类型。

```ts
let mySearch: SearchFunc;
mySearch = function(src, sub){
    let result = src.search(sub);
    return result > -1;
}
``` 

## Indexable Types

类似我们使用接口描述函数类型，我们也可以描述我们可以索引的类型，如 `a[10]`, 或 `ageMap["daniel"]`. 可索引的类型有一个索引签名，描述我们可用于去索引对象的类型，及索引时返回的类型。来看一个例子：

```ts
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```

上面我们有一个有一个索引签名的 `StringArray` 接口。

这个索引签名陈途了当以 `number` 索引 `StringArry` 时，他将返回 `string`.

支持两种类型的索引签名：string 和 number. 

也可能两种都支持，但是数字索引返回的类型必须是字符串索引返回类型的子类型。这是因为当用 `number` 索引时，JavaScript 实际上在索引前将其转为 `string`. 

这意味着用 `100` (数字) 索引和用 `"100"` (字符串) 索引的同一事情, 所以两者应该一致。

```ts
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a 'string' will sometimes get you an animal!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```

字符串索引签名是描述字典模式强有力的方式，他们也强制所有的属性匹配他们的返回类型。这是因为索引声明 `obj.property` 也通过 `obj["property"]` 可用。下面的例子中 `name` 的类型不匹配字符串索引的类型，类型检查器给出一个错误：

```ts
interface NumberDictionary{
    [index: string]: number;
    length: number;  // ok, length is a number
    name: string;    // error, the ype of 'name' is not a subtype of the indexer
}
```

最后，你可以使索引签名只读以防止给他们赋值：

```ts
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = "Mallory"; //error!
```

你不能设置 `myArray[2]` 因为索引签名是只读的。

## Class Types

`实现一个接口`

在 C# 和 Java 中接口常见的用法是明确的强制一个类满足特殊的合约，这在 TypeScript 中也是可以的。

```ts
interface IClock {
    currentTime: Date;
}

class Clock implements IClock{
    currentTime: Date;
    constructor(h: number, m: number){

    }
}
```

你也可以在接口中定义类中要实现的方法，下面的例子用了 `setTime`:

```ts
interface IClock{
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements IClock {
    currentTime: Date;
    setTime(d: Date){

    }
    constructor(){}
}
```

接口描述类的公共部分，而非公共部分和私有部分。

这防止你使用他们检查一个类有用于类实例私有部分的特殊类型。

### Difference between the static an instance sides of classes

当处理类和接口时，记住一个类有两种类型是有帮助的：静态部分的类型和实例部分的类型。

你可能会注意到如果你创建一个有构造函数签名的接口且创建一个实现这个接口的类你会得到一个错误：

```ts
interface IClock {
    new (hour: number, minute: number);
}

class Clock implements IClock {
    currentTime: Date;
    constructor(h: hour, m: number){}
}
```

这个因为当一个类实现一个接口，只有类的实例部分被检查。因为构造函数存在于静态部分，他不在检查中。

而是，你要直接处理类的静态部分。在这个例子中，我们定义了两个接口，`ClockContructor` 用于构造函数，`ClockInterface` 用于实例方法。

然后为了方便起见我们定义了一个构造函数 `createClock` 创建我们传递给他的类型的实例。

```ts
interface IClockContructor {
    new (hour: number, minute: number): IClock;
}

interface ICLock {
    tick();
}

function createClock (ctor: IClockContructor, hour: number, minute: number): IClock {
    return new ctor(hour, minute);
}

class DigitalClock implements IClock {
    constructor(h: number, m: number){

    }
    tick(){
        console.log("beep beep");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

因为 `createClock` 的第一个参数是 `ClockConstructor` 类型，在 `createClock(AnalogClock, 7, 32)` 中，他检查 `AnalogClock` 有正确的构造函数签名。

## Extending Interfaces

像类一样，接口可以扩展彼此。

这使得你拷贝一个接口的成员到另一个，这给你更多的灵活性，将接口分离成独立的可重用组件。

```ts
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square> {};

square.color = "blue";
square.sideLength = 10;
```

一个接口可以扩展多个接口，创建所有接口的合体。

```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square> {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

## Hybrid Types

正如我们上面提到的，接口可以描述 JavaScript 世界丰富的类型。因为 JavaScript 动态和灵活的本质，你可能时不时遇到一个对象是上面描述类型的结合。

一个一个对象既是函数又是对象，还有额外的属性：

```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset: void;
}
```

当与第三方 JavaScript 库交互时，你可能需要用上面的模式来完整描述类型的形状。

## Interface Extending Classes

当一个接口类型扩展一个类类型时，他继承了类类型的成员而非他的实现。

就好像接口声明了类的所有成员而不用提供实现。

接口甚至继承了基类的私有和保护成员。

这意味着当你创建一个继承有私有和保护成员的类时，这个接口只能被这个类和这个类的子类实现。

当有非常大的继承层级时这是很有用的，但要指出你的代码只能用于有特殊属性的子类。除了继承自基类外子类不必有关联。如：

```ts
class Control{
    private state: any;
}

interface SelectableControl extends Control{
    select(): void;
}

class Button extends Control implements SelectableControl{
    select(){}
}

class TextBox extends Control{}

//Class 'Imagee' incorrectly implements interface 'SelectableControl'.
//Property 'state' is missing in type 'Imagee'.
class image implements SelectableControl{
    select(){}
}

class Place{}
```

上述例子中，`SelectableControl` 包含 `Control` 的所有成员，包括私有的 `state` 属性。由于 `state` 是私有成员, 只有 `Control` 的子孙才有可能实现 `SelectableControl`. 

这是因为 `Control` 的子孙有源于同一声明的 `state` 私有成员，这是对私有成员兼容的要求。

Within the `Control` class it is possible to access the `state` private member through an instance of `SelectableControl`.

实际上，一个 `SelectableControl` 作用类似 有 `select` 方法的 `Control`。

`Button` 和 `TextBox` 类是 `SelectableControl` 的子类型 (因为他们都继承自 `Control` 并有一个 `select` 方法)，但 `image` 和 `Place` 不是。//?

