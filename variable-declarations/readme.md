# Variable Declarations

`let` 和 `const` 是 JavaScript 中两种相对新的声明变量的方式。`let` 在某些方面与 `var` 相似，但可以避免在 JavaScript 中遇到的一些常见的陷阱。`const` 是 `let` 的增强，他防止对一个变量的重复赋值。

TypeScript 是 JavaScript 的超集，这门语言自然支持 `let` 和 `const`. 此处我们说详尽阐述并说明为什么我们倾向于 `var`.

If you've used JavaScript offhandedly, the next section might be a good way to refresh your memory.

如果你暗熟 JavaScript 中 `var` 声明的怪癖, 你会发现这很容易。

## var declarations

在 JavaScript 中声明变量传统上是用 `var` 关键字。

```js
var a = 10;
```

你可能明白，我们只不过是声明了一个名为 `a` 值为 `10` 的变量。

我们也可以在函数中：

```js
function f(){
    var message = '';

    return message;
}
```

我们也可以在其他函数中访问同一变量：

```js
function f(){
    var a = 10;
    return function g(){
        var b = a + 1;
        return b;
    }
}

var g = f();
g(); // returns '11'
```

上面这个例子中 `g` 捕获了 `f` 中声明的变量 `a`。任何中时候 `g` 被调用，`a` 的值将被绑定 `f` 中 `a`。

即使 `f` 完成运行后 `g` 被调用，也能访问和修改 `a`.

__./index.js__

```js
function f(){
	var a = 1;
	a = 2;
	var b = g();
	a = 3;

	return b;

	function g(){
		return a;
	}
}

f();
```

### Scoping rules

`var` 声明有奇怪的作用规则。

如以下示例：

__./scoping-ruels/index.ts__

```ts
export function f(shouldInitialize: boolean){
	if(shouldInitialize){
		var x = 10;
	}

	return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```

一些读者可能会再次看下才能明白这个示例。

变量 `x` 在 `if` 块中声明，而去可以在那个块之外访问。

那是因为 `var` 在他们的包含函数中，模块，名称空间，或全局作用域中都可访问，而非包含块，我们稍后将重温一下。

一些人称这为 `var` 作用域或函数作用域。

参数也是函数作用域。

这会造成一些错误。

一是多次声明一个变量并不是错误：

```ts
export function sumMatrix(matrix: number[][]) {
	var sum = 0;
	for (var i = 0; i < matrix.length; i++) {
		var currentRow = matrix[i];
		for (var i = 0; i < currentRow.length; i++) {
			sum += currentRow[i];
		}
	}
	return sum;
}
```

可能一些很容易察觉，但是内部的 `for` 循环将会意外地覆盖 `i` 因为 `i` 指同一函数作用域的变量。

至此，有经验的开发者知道，一些这样的 bugs 溜过代码检查并会是无穷无尽令人懊恼的源泉。

### Variable capturing quirks

快速看下，猜猜下面代码片段会输出什么：

```js
for(var i = 0; i < 10; i++>){
    setTimeout(function(){ console.log(i); }, 100 * i);
}
```

对于那些不熟悉的人， `setTimeout` 将在某些数量的毫秒后尝试执行行一个函数 (然而啥也不等就停止运行了)。

准备好了吧？看一下：

```bash
10
10
10
10
10
10
10
10
10
10
```

很多 JavaScript 开发者对这种行为都不陌生，如果你感到吃惊，那你显然不是。

大多人期望的输出是这样的：

```bash
0
1
2
3
4
5
6
7
8
9
```

记得前面我们提到的变量捕获吗？

我们传递给 `setTimeout` 的每个函数表达式实际上指同一作用域中的同一个 `i`.

让我们花一分钟考虑下其中的含义。

`setTimeout` 将会在一些时间间隔后运行一个函数，`for` loop 执行完时，`i` 的值是 `10`.

所以每次给定函数被用时，他都打印  `10`!

常用的解决方式是使用 IIFE - 立即调用函数表达式 - 捕获每次遍历 `i` 的值：

```js
for(var i = 0; i < 10; i++>){
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i){
        setTimeout(function(){ console.log(i); });
    })(i);
}
```

这个看起来奇怪的模式实际上相当常见。

参数列表中的 `i` 实际上遮住了 `for` 循环中声明的 `i`, 但由于我们用同一命名，我们不需要修改太多地方。

## let declarations

到现在为止，我们明白了 `var` 有一些问题，这也正是为什么引入了 `let` 语句。

除了使用不同的关键字，`let` 语句和 `var` 语句的写法一样。

```js
let hello = 'Hello!';
```

关键的区别不在语法，而在句义，现在我们要深入探讨下

### Block-scoping

当用 `let` 声明一个变量，他使用了我们叫作词法作用域或块作用域的东西。

不像 `var` 声明的变量那样，作用域至包含函数，块作用域变量是最近的包含块或 `for` 循环外不可见的。

__./block-scoping/index.ts__

```ts
function f(input: boolean){
    let a = 100;

    if(input){
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Error: 'b' doesn't exist here
    return b;
}
```

这里，我们有两个本地变量 `a` 和 `b`。

`a` 的作用域限制在 `f` 体内，而 `b` 的作用域被限制在包含的 `if` 语句内。

声明在 `catch` 语句中的变量也有相似的作用域规则。

```js
try{
    throw 'oh no!';
}
catch(e){
    console.log('Oh well.');
}

// Error: 'e' doesn't exist here
console.log(e);
```

块作用域变量的一个属性是在声明前不能读写。虽然这些变量出现在他们的整个作用域，但在他们声明之前是他们的临时性死区。这只是在 `let` 语句前不能访问他们的复杂的说法，幸运的是 TypeScript 让我们知道。

__./temporal-dead-zone/index.ts__

```ts
a++; // illegal to use 'a' before it's declared
let a;
```

有一点要注意，你仍然可以在块作用域变量声明前将其捕获。唯一不合法的捕获是在声明前调用函数。如果目标是 ES2015, 现代运行时会抛错，然而现在 TypeScript 允许且不会把这当作错误报告。

更多临时性死区的信息，见 [Mozilla Developer NetWork](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let).

### Re-declarations and Shadowing 

`var` 声明，我们前面提到过，无论你声明变量多少次，你只得到一个。

```js
function f(x){
    var x;
    var x;

    if(true){
        var x;
    }
}
```

上面的例子中，所有的 `x` 声明实际上指向同一 `x`, 这是完全有效的。

这么做的后果是为 bugs 埋下伏笔。

谢天谢地，`let` 声明不会饶恕这种行为：

```js
let x = 10;
let x = 20; // error: can't re-declare 'x' in the same scope
```

并非都是块作用域的变量 TypeScript 才会告诉你存在问题。

```js
function f(x){
    let x = 100; // error: interferes with parameter declaration
}

function g(){
    let x = 100;
    var x = 100; //error: can't have both declarations of 'x'
}
```

这并非是说，块作用域的变量就不能和函数作用域的变量一起声明。

块作用域变量只需要声明在明显不同的块中就可以。

```js
function f(condition, x){
    if(condition){
        let x = 100;
        return x;
    }
    return x;
}

f(false, 0); // return '0'
f(true, 0);  // returns '100'
```

在一个更嵌套的作用域中引入新名称叫 `shadowing`.

屏蔽，这是个双刃剑，可以防止一些 bug, 意外的屏蔽会引入一些 bug.

例如，假设我们用 `let` 变量写了之前的 `sumMatrix` 函数。

__./sum-matrix/index.js__

```ts
function sumMatrix(matrix: number[][]){
    let sum = 0;
    for(let i = 0; i < matrix.length; i++>){
        let currentRow = matrix[i];
        for(let i = 0; i < currentRow.length; i++){
            sum += currentRow[i];
        }
    }

    return sum;
}
```

这个版本的循环实际上执行正确的求和因为内层循环的 `i` 屏蔽来自外层循环的 `i`.

清淅的代码常常要避免屏蔽。然而一些情形可很适合利用屏蔽，你要自己判断。

### Block-scoped variable capturing

当我们第一次触及到 `var` 变量捕捕获的问题时，我们简单讲了变量捕获后变量如何表现。更直观的来说，每次作用域运行时，他创建一个变量的环境。这个环境和其捕获的变量即使在作用域已经完成执行后仍然存在。

```ts
function theCityThatAlwaysSleeps(){
    let getCity;
    if(true){
        let city = 'Seattle';
        getCity = function(){
            return city;
        };
    }
    return getCity();
}
```

因为我们已经从 `city` 的环境中捕获了他，尽管 if 块已经完成了执行我仍然可以访问。

回顾下我们之前的 `setTimeout` 例子，我们以 IIFE 来捕获 for 循环每次遍历的变量状态。事实上我们为捕获的变量创建了一个新的变量环境。这有点痛苦，但幸运的是在 TypeScript 中我们不需要这样做了。

当 `let` 声明声明为循环的一部分时有完全不同的行为。貌似这些声明每次遍历都创建一个新的作用域，而非只为循环本身引入一个新的作用域。这正是我们用我们的 IIFE 所作的，我们将我们老的 setTimeout 例子改为使用 `let` 声明。

__./set-timeout/index.js__

```ts
for(let i = 0; i < 10; i++>){
    setTimeout();
}
```

正如期望，这将打印出：

```console
0
1
2
3
4
5
6
7
8
9
```

## const declaration

const 是声明变量的另一种方式。

```js
const numLivesForCat = 9;
```

他们类似于 `let` 但正如他们的名子，一旦被绑定，他们的值便不能变化。换名话说他们与 `let` 有同样的作用域，但是你不能给重复赋值。

不要和他们指向的值是不可修改的这个概念混淆。

src/2.ts

```js
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat
};

//Error
kitty = {
    name: "Danielle",
    numLives: numLivesForCat
};

//all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```

除非你采取措施避免，否则 `const` 内部的变量仍然是可修改的。幸运的是, Typesciprt 允许你指定一个对象的成员是 `readonly`. 详情见 [Interface](/interfaces/) 章节。

## `let` vs. `const`

鉴于我们有两种作用域语义相似的类型声明，问一问自己使用哪种是很自然的事情。如大多广泛的问题一样，答案是：你自己决定。

应用 [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege), 所有声明除了你计划修改的应该使用 `const`. 基本的原则是如果一个变量不需要被写，工作于同一源代码库的其他人也不应该能写，也将需要考虑是否他们真需要对变量重新赋值。使用 `const` 使得追溯数据流时更可预测。

另一方面，`let` is not any longer to write out than `var`, 很多用户倾向其简洁。这本 handbook 大多用 `let` 出于此。

你自己好好判断，如果可应用咨询下团队的其他成员。

## Destructuring

TypeScritp 有的另一个 ECMAScript 的特色是解构。完整的引用见 [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 上的文章。本节，作简单介绍。

### Array destructuring

简单形式的解构是数组解构赋值：

```js
let input = [1, 2];
let [first, second] = input;
console.log(first); //outputs 1
console.log(second); //outpus2
```

这创建了两个变量 `first` 和 `second`. 这等同于使用索引，但更加方便：

```js
first = input[0];
second = input[1];
```

解构也可用于已声明的变量：

```js
//swap variables
[first, second] = [second, first];
```

用于函数的参数：

```ts
function f([first, second]: [number, number]){
    console.log(first);
    console.log(second);
}
f([1, 2]);
```

你也可以用 `...` 语法为列表中剩余的项创建一个变量：

```ts
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outpus [2, 3, 4 y7 ]
```

当然，这是 JavaScript, 你可以忽略掉你不关心的尾随的元素：

```js
let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1
```

或其他元素：

```js
let [, second, , fourth] = [1, 2, 3, 4];
```

### Object destructuring

你也可以解构对象：

```js
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
};

let { a, b } = o;
```

这从 `o.a` 及 `o.b` 创建新变量 `a` 和 `b`.

注意，如果你不需要 `c` 你可以忽略他。

类似数组解构，你可以赋值而不用声明：

```js
({ a, b }) = { a: 'baz', b: 101 };
```

注意我们用括号包围了这个语句。

正常情况下，JavaScript 解析 `{` 为块的开始。

你也可用语法 `...` 为对象中剩余的其他项创建一个变量。

```js
let {a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length
```

### Property renaming

你也可以给属性不同的名称：

```js
let { a: newName1, b: newName2 } = o;
```

这点语法有点让我困惑。

你可以将 `a: newName1` 读作 `a` 作为 `newName1`.

方向是从左到右，好像是这样写的：

```js
let newName1 = o.a;
let nameName2 = o.b;
```

令人困惑的时，这里的分号指的并不是类型。

如果你指定类型，要在整个解构后面：

```ts
let { a, b }: {a: string, b: number} = o;
```

### Default values

你可以指定一个默认值以防一个未定义的属性：

```ts
function keepWholeObject(wholeObject: { a: string, b?: number }){
    let { a, b = 1001 } = wholeObject;
}
```

`keepWholeObject` 现在有一个 `wholeObject` 变量及 `a` 和 `b` 属性，即便 `b` 没有定义。

### Function declarations

解构也可用于函数声明中。
如以下简单代码：

```ts
type C = { a: string, b?: number };
function f({ a, b }: C): void {
    // ...
}
```

常见的是给参数指定默认值，用解构处理默认值有点棘手。

首先，你要记得在默认值之前摆上模式。

```ts
function f({ a, b } = { a: '', b: 0 }): void {
    // ...
}
f(); // ok, default to { a: '', b: 0 }
```

> 上面的代码片段是类型推断的示例，手册后面会介绍。

然后你要记住给解构的属性而非主初始器默认参数。

记住 `c` 定义的有 `b` 可选属性：

```js
function f({ a, b = 0} = { a: '' }): void{
    //...
}

f({ a: 'yes' }); // ok, default b = 0
f(); // ok, default to { a: '' }, which then defaults b = 0

f({}); //error, 'a' is required if you supply an argument
```

小心使用解构。

正如前面的示例演示的那样，除了最简单的解构表达式以外都是令人困惑的。

更深嵌套的解构更是这样，即使没有重命名，默认值，类型声明也很难理解。

尽量使解构表达式小而简单。

你也可以一直用赋值语句，自己生成解构。

## Spread

展开操作符与是解构相反。他允许你在一个数组中展开另一个数组，或在对象中。

例如：

```js
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
```

这给了 `bothPlus` 值 `[0, 1, 2, 3, 4, 5]`。展开创建 `first` 和 `second` 的浅拷贝。展开操作不会改变原数据。

也可以展开对象：

```js
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' };
let search = { ...default, food: 'rich' };
```

现在 `search` 是 `{ food: 'rich', price: '$$', ambiance: 'noisy' }`.

展开对象比展开数组更复杂一些。类似数组展开，对象展开是从左到右进行，但结果仍然是对象。这意味着后而出现的属性覆盖前面出现的属性。所以如果我们修改之间的例子在末尾展开：

```js
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' };
let search = { food: 'rich', ...defaults };
```

那 `defaults` 中的 `food` 覆盖 `food: 'rich'`, 这并不是那种情形我们想要的。

对象展开也有些令人吃惊的限帛。首先，他只包括一个对象[自己的可枚举属性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。

本质上来说，这意味着如果你传递一个对角实例，你会丢掉方法：

```ts
class C{
    p = 12;
    m(){

    }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

每二，TypeScript 编译器不允许展开泛型函数的类型参数。期待未来版本的 TypeScript 有这种特色。

