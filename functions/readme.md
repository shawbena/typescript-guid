# Functions

函数是 JavaScript 中任何应用的最基本的构建块。

你使用他们来构建抽象层，模拟类，隐藏信息，和模块。

TypeScript 中虽然有类，名称空间，和模块，函数仍然仍然扮演着如何做事的重要角色。

TypeScript 也添加了一些新的特色使标准的 JavaScript 函数更容易使用。

和 JavaScript 中那样，TypeScript 中函数既可以创建为命名函数也可以创建匿名函数。

这使得你选择最适合你应用程序的方法，无论是构建 API 中的函数列表，还是传递给另一个函数的一次性函数。

快速回顾下 JavaScript 中的这两种方式：

_index.ts_

```ts
// Named function
function add(x, y){
    return x + y;
}

//Anonymous function
let myAdd = function(x, y){ return x + y; };
```

就像 JavaScript 中那样，函数可引用函数体外的变量。

当他们这么做时，我们说他们 `capture` 了这些变量。

而理解他是如何工作的，及使用这个技术的取舍超出了本篇文章的范围，对此机制有坚实的理解是使用 JavaScript 和 TypeScript 重要的一点。

```ts
let z = 100;

function addToZ(x, y){
    return x + y + z;
}
```
## Function Types

### Typing the function

让我们给我们之前简单的例子添加类型：

_./function-types/index.ts_

```ts
function add(x: number, y: number): number{
    return x + y;
}

let myAdd = function(x: number, y: number): number{
    return x + y;
};
```

我们可以给每个参数添加类型，然后给函数添加返回类型。TypeScript 可以通过查看返回语句计算出返回类型，所以大多情况下不用指定返回类型。

### Writing the function type

既然我们已经给函数类型，让我们看看函数类型的每个片段写出完整的函数类型。

```ts
let myAdd: (x: numberk, y: number) => number = function(x: number, y: number): number{
    return x + y;
}
```

函数的类型有两部分：参数的类型和返回类型。当写出函数的完整类型时，两部分都需要。我们写出的参数类型就象参数列表一样，给每个参数一个名称和类型。名称仅仅是为了提高可读性。我们也可以这样写：

```ts
let myAdd: (baseValue: number, increment: number) => number = function(x: number, y: number): number{
    return x + y;
};
```

只要参数类型对得上，对于函数而言就是有效的类型，不管函数类型中参数的名称是什么。

第二个部分是返回类型。将 `=>` (fat arrow) 放在参数和返回类型之间使返回类型清晰些。正如之前提到过的那样，这是函数类型需要的一部分，所以如果函数没有返回值，你要用 `void` 指明而非撒手不管。

值得注意的是，只有参数和返回类型构成函数类型。捕获的变量不反映在类型中。实际上，捕获的变量是函数隐藏的状态并不构成函数的 API. 

### Inferring the types

在和例子玩耍时，你可能已经注意到了 TypeScript 编译器可以计算出类型，如果在等号的一侧有类型但另一侧没有：

_./function-types/inferring-the-types.ts_

```ts
//myAdd has the full function type
let myAdd = function(x: number, y: number): number{
    return x + y;
}

// The parameters 'x' and 'y' have the type number
let myAdd2: (baseValue: number, increment: number) => number = function(x, y){
    return x + y;
};
```

这叫 "contextual typing"，一种类型推断的形式。这有助于减少使你程序保持类型所付出的精力。

## Optional and Default Parameters

在 TypeScript 中，假设每个参数都是函数需要的。这并不意味着不能给 `null` 或 `undefined`, 而是当调用函数时编译器会检查用户给每个参数都提供了值。编译器也假设这些参数传递给函数的仅有参数。简而言之，给函数参数的数量必须匹配函数期望的参数的数量。

_./optional-and-default-parameters/index.ts_

```ts
function buildName(firstName: string, lastName: string){
	return firstName + ' ' + lastName;
}

// [ts] 应有 2 个参数，但获得 1 个。
let result1 = buildName('Bob');

//[ts] 应有 2 个参数，但获得 3 个。
let result2 = buildName('Bob', 'Adams', 'Sr.');

// ah, just right
let result3 = buildName('Bob', 'Adams');
```

在 JavaScript 中，每个参数是可选的，用户可能随以所欲不管他们，当这样做时，他们的值是 `undefined`, 我们可以在我们想要成为可选的参数后面加 `?` 来获得这样的功能。例如上面的姓氏参数是可选的：

_./optional-parameters.ts_

```ts
function buildName(firstName: string, lastName?: string){
    if(lastName){
        return firstName + ' ' + lastName;
    }else{
        return firstName;
    }
}

let result1 = buildName('Bob');
let result2 = buildName('Bob, 'Adams', 'Sr.');
let result3 = buildName('Bob', 'Adams');
```

可选参数要跟在必须的参数后面。如果我们想要让名子可选而非姓氏，我们要调整函数中通用数的顺序，将名子放在列表最后。

在 TypeScript 中，我们也可以设置用户没有提供值参数要被赋的值，或用户传递的值是 `undefined`. 这叫默认初始化的参数。让我们用前面的例子，将姓氏默认设为 `'Smith'`

```ts
function buildName(firstName: string, lastName = 'Smith'){
    return firstName + ' ' + lastName;
}

// works correctly now, returns 'Bob Smith'
let result1 = buildName('Bob');

// still works, and returns 'Bob Smith'
let result2 = buildName('Bob', undefined);

// error, too many parameters
let result3 = buildName('Bob', 'Adams', 'Sr.');

// ah, just right
let result4 = buildName('Bob', 'Adams');
```

出现在所有必须后面的默认初始化参数被视为可选的，就像可选参数一样，当调用他们的相应函数时可以忽略这些参数。这意味着可选参数及尾部的默认参数共享类型上的共同性，所以：

```ts
function buildName(firstName: string, lastName?: string){
    //...
}
```

和

```ts
function buildName(fristName: string, lastName = 'Smith'){
    //...
}
```

共享同一类型 `(firstName: string, lastName?: string) => string`. 默认值 `lastName` 消失在类型中，留下参数可选的事实。

不像单纯的可选参数，默认初始化的参数不需要出现在必须参数后面。如果默认初始化的参数出现在必须参数前，用户要明确传递 `undefined` 来获得需要的参数。例如，我们可以将上个例子写成 只有 `firstName` 是默认初始化的：

```ts
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```

## Rest Parameters

必须的，可选的，和默认参数都有一个共同性：他们一次只谈论一个参数。有时，如果你想把多个参数作为一组处理，或者你可能都不知道一个函数到底要接收多少个参数。在 JavaScript 中，你可以函数体中使用 `arguments` 变量直接处理参数。

在 TypeScript 中，你可以将这些参数收集在一起成为一个变量：

```ts
function buildName(firstName: string, ...restOfName: string[]){
    return firstName + ' ' + restOfName.join(' ');
}

let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie');
```

Rest 参数被视为无边无际数量的可选参数。当给 rest 参数传递参数时，你想传多少都可以，不传也可以编译器会根据省略点 (`...`) 的名称创建一个数组，使得你在函数中可以使用他。

省略号也用于函数中有 rest 参数的类型：

```ts
function buildName(firstName: string, ...restOfName: string[]){
    return firstName + ' ' + restOfName.join(' ');
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

## `this`

学会在 JavaScript 中怎样使用 `this` 是一件值得庆祝一番的事情。TypeScript 是 JavaScript 的超集，TypeScript 的开发者也需要学习怎样使用 `this`, 当使用不正确时能发现问题。幸运的是，TypeScript 以一些技术让你能捕捉到 `this` 的不当用法。如果你要学一下 `JavaScript` 中的 `this` 是怎样工作的，首先读下 Yehuda Katz 的 [Understanding JavaScript Function Invocation and "this"](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/). Yehuda's 的文章对 `this` 解释的非常好，所以此处我们只介绍些基本的。

### `this` and arrow functions

在 JavaScript 中，`this` 是当函数调用时设置的变量。这是一个灵活而又强大的特色，但代价是要一直清晰函数执行的环境。这是令人迷惑的，尤其是返回一函数或把函数当作参数传递时。让我们看一个例子：

```ts
let desk = {
	suits: ['hearts', 'spades', 'clubs', 'diamounds'],
	cards: Array(52),
	createCardPicker: function(){
		return function(){
			let pickedCard = Math.floor(Math.random() * 52)
			let pickedSuit = Math.floor(pickedCard / 13);
			return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
		}
	}
};

let cardPicker = desk.createCardPicker();
let pickedCard = cardPicker();
alert('card: ' + pickedCard + ' of ' + pickedCardCard.suit);
```

注意 `createCardPicker` 函数返回一个函数。如果我们尝试运行这个函数，我们会得到一个错误而不是期望的警告框。这个因为 `createCardPicker` 创建的函数中的 `this` 将会是 `window` 而非 `desk` 对象。这是因为 `cardPicker()` 独自被调用了。

顶层的非方法调用 (应该指的是函数吧) 如这个将用 `window` 作为 `this`. (注意：在严格模式下 `this` 将会是 `undefined` 而非 `window`).

要修复这个问题，在返回要使用的函数前，我们要确促保函数绑定正确的 `this`. 这样，无论稍后怎样使用，仍然绑定的是原来的 `desk` 对象。

要这么做，我们改动原来的函数使用 ECMAScript 6 的箭头语法。

箭头函数捕获函数创建时而非调用时的 `this`：


```ts
let desk = {
	suits: ['hearts', 'spades', 'clubs', 'diamounds'],
	cards: Array(52),
	createCardPicker: function(){
		// Note: the line below is now an arrow function, allowing us to capture 'this' right here
		return () => {
			let pickedCard = Math.floor(Math.random() * 52)
			let pickedSuit = Math.floor(pickedCard / 13);
			return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
		}
	}
};

let cardPicker = desk.createCardPicker();
let pickedCard = cardPicker();
alert('card: ' + pickedCard + ' of ' + pickedCardCard.suit);

```

再好些，如果你给编译器指定 `--noImplicitThis`，当你出现这样的错误时，TypeScript 会警告你。编译器将指出 `this.suits[pickedSuit]` 中的 `this` 是 `any` 类型。

### `this` parameters

不幸的是，`this.suits[pickedSuit]` 中的 `this` 仍然是 `any`.

这是因为 `this` 来自对象字面中的函数表达式。要解决这个问题，你要提供一个明确的 `this` 参数。`this` 参数是一个冒充参数，他出现在函数参数列表的开头:

```ts
function f(this: void){
	// make sure `this` is unusable in this standalone
}
```

让我们给上面的例子添加几个接口, `Card` 和 `Deck`, 使类型更清晰和易重用：

_./this/3.ts_

```ts
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

现在 TypeScript 知道 `createCardPicker` 期望在 `Deck` 对象上调用。这意味着现在 `this` 是 `Deck` 类型，不是 `any`, 所以 `--noImplicitThis` 也不会报错。

#### `this` parameters in callbacks

你也会遇到回调中的 `this` 错误，当你把函数传递给稍后调用他的库时。因为库会像正常函数一样调用你的函数，`this` 将会是 `undefined`. 

做一些工作你可以使用 `this` 参数防止回调中有错误。

首先库作者需要标注 `this` 的回调类型：

```ts
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
```
`this: void` 意味着 `addClickListener` 期望 `onclick` 函数不需要 `this` 类型。

其交，标注调用代码的 `this`:

```ts
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event){
        // oops, used this here. using this callback would crash at runtime
        this.info = e.message;
    }
}

let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```

标注的 `this`, 你明确指明 `onClickBad` 必须在 `Hanlder` 实例上调用。然后 TypeScript 将侦测到 `addClickListener` 需要一个 `this: void` 的函数。要解决这个问题，改变 `this` 的类型：

```ts
class Handler{
    info: string;
    onClickGood(this: void, e: Event){
        // can't use this here because it's of type void!
        console.log('clicked!');
    }
}

let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

因为 `onClickGood` 指定 `this` 的类型是 `void`, 将这个函数传递给 `addClickListener` 是合法的。

当然，这也意味着你不能用 `this.info`. 如果你想鱼与熊掌兼德，你不得不用箭头函数：

```ts
class Handler{
    info: stirng;
    // 没有指定 this 参数类型，但却捕获了 this
    onClickGood = (e: Event) => {
        this.info = e.message;
    }
}
```

这起作用了，因为箭头函数不捕获 `this`, 所以你可以总是可以传给期望 `this: void` 的函数。//?

弊端是每个 Handler 类型的对象都会创建一个箭头函数。而方法，只会创建一次并附加在 Handler 的原型上，是在所有 Handler 类型的对象上共享的。

## Overloads

JavaScript 本来就是一种很动态的语言。

基于传入参数的类型返回不同类型的对象对于一个函数来说并不是不常见的。

_./overloads/index.ts_

```ts
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x): any {
	if(typeof x == 'object'){
		let pickCard = Math.floor(Math.random() * x.length);
	}else if(typeof x == 'number'){
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}

let myDeck = [{
	suit: 'diamonds', 
	card: 2 }, {
	suit: 'spades', 
	card: 10 }, {
	suit: 'hearts',
	card: 4,
}];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + ' of ' + pickedCard2.suit);
```

基于用户传递的参数类型 `pickCard` 函数将返回两种不同的东西。如果用户传递的是表示牌的对象，函数将选一张牌。如果用户选牌，我们就告诉他选中了什么牌。但这怎样用类型系统描述呢？

答案是提供用于同一函数的多个函数类型作为重载列表。编译器将使用函数列表解析函数调用。

让我们创建一个重载列表描述 `pickCard` 接受什么，返回什么。

_./overloads/overload-list.ts_

```ts
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: { suit: string; card: number; }[]): number;

/*
[ts] 函数实现缺失或未立即出现在声明之后。
function pickCard(x: number): {
    suit: string;
    card: number;
} (+1 overload)
*/
function pickCard(x: number): { suit: string; card: number; }

function pickCard(x): any {
	if(typeof x == 'object'){
		let pickCard = Math.floor(Math.random() * x.length);
	}else if(typeof x == 'number'){
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}
let myDeck = [{
	suit: 'diamonds', 
	card: 2 }, {
	suit: 'spades', 
	card: 10 }, {
	suit: 'hearts',
	card: 4,
}];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + ' of ' + pickedCard2.suit);
```

这样的变化，重载给了我们调用 `pickCard` 函数的类型检查。为了让编译器挑选正确的类型检查 (typecheck), 他按照了类似底层 JavaScript 的过程。// 有道理

编译器查看重载列表，从第一个重载开始，尝试以提供的函数调用函数。如果匹配，编译器挑选这个重载作为正确的重载。因此，通常重载顺序常常从最特定到最不特定 (For this reason, its customary to order overloads from most specific to least specific).

注意，`function pickCard(x): any` 并不属于重载列表，这个函数只有两个重载：一个接受一个对象，另一个接受一个数字。以任何其他类型的参数调用 `pickCard` 会造成错误。