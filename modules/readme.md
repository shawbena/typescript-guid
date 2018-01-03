# Modules

从 ECMAScript 2015 开始，JavaScript 有模块的概仿。TypeScript 也有这个概念。

模块在自己的作用域中执行，而非在全局作用域中。这意味着在模块中声明的变量，函数，类等等除非明确地使用 [export](#export) 导出，否则是对模块外不可见的。

反之要使用从不同模块导出的变量、类、接口等等，必需要用使用 [import](#import) 导入。

模块是声明性的，模块间的关系由文件层指定的输入和导出指定。

模块使用模块加载器引入另一个模块。在运行时，模块加载器负责在模块执行前定位和执行模块的依赖。有名的模块加载器有 Node.js 的 [CommonJS](https://en.wikipedia.org/wiki/CommonJS) 及用于 Web 应用的 [require.js](http://requirejs.org/).

TypeScript 和 ECMAScript 2015 一样，在顶层包含 `import` 或 `export` 的任何文件都被视为一个模块。

## Export

__Exporting a declaration__

任何声明都可以加 `export` 关键字导出。

Validation.ts

```ts
export interface StringValidator{
	isAcceptable(s: string): boolean;
}
```

ZipCodeValidator.ts

```ts
export const numberRegxp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator{
	isAcceptable(s: string){
		return s.length === 5 && numberRegexp.test(s);
	}
}
```

__Export statements__

当导出需要重命名时，导出语句是很方便的，所以以上示例可写为：

```ts
class ZipCodeValidator implements StringValidator{
	isAcceptable(s: string){
		return s.length === 5 && numberRegexp.test(s);
	}
}

export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```

__Re-exports__

## Import

引入就好象从一个模块导出一样 easy. 引入一个导出的声明通过以下 `import` 形式之一完成：

__Import a single export from a module__

```ts
import { ZipCodeValidator } from './ZipCodeValidator';

let myValidator = new ZipCodeValidator();
```

引入也可以重命名

```ts
import { ZipCodeValidator as ZCV } from './ZipCodeValidator';

let myValidator = new ZCV();
```

__Import the entire module into a single variable, and use it to access the module exports__

```ts
import * as validator from './ZipCodeValidator';
let myValidator = new validator.ZipCodeValidator();
```

__Import a module for side-effects only__

虽然不是推荐的实践，但是一些模块设置了一些其他模块要用的其他变量。

这些模块可能没有任何输出，或者使用者对任何形式的输出都不感趣。//TypeScript 是怎样将这样的文件视为模块？

要引入这样的模块，用：

```ts
import './my-module.js';
```

## Default exports

每个模块可选地导出一个 `default` 输出。默认输出用 `default` 关键字标识，每个模块只能有一个 `default` 输出。默认输出用一个不同形式的引入。

`default` 输出真的很方便。如，一个库如 JQuery 可能有一个默认的输出叫 `jQuery` 或 `$`, 可能在名 `$` 或 `jQuery` 下引入。

JQuery.d.ts

```ts
declare let $: JQuery;
export default $;
```

App.ts

```ts
import $ from 'JQuery';

$('button.continue').html('Next Step...');
```

类和函数声明可直接被写作默认输出。默认输出的类和函数的名称是可选的。

ZipCodeValidator.ts

```ts
export default class ZipCodeValidator{
	static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
}
```

Test.ts

```ts
import validator from './ZipCodeValidator';

let myValidator = new Validator();
```

或

StaticZipCodeValidator.ts

```ts
const numberRegexp = /^[0-9]+$/;

export default function (s: string) {
    return s.length === 5 && numberRegexp.test(s);
}
```

Test.ts

```ts
import validate from "./StaticZipCodeValidator";

let strings = ["Hello", "98052", "101"];

// Use function validate
strings.forEach(s => {
  console.log(`"${s}" ${validate(s) ? " matches" : " does not match"}`);
});
```

`default` 输出可以只是值：

OneTwoThree.ts

```ts
export default '123';
```

Log.ts

```ts
import num from './OneTwoThree';

console.log(num); // '123'
```

## `export =` and `import = require()`

CommonJS 和 AMD 在致上都有 `exports` 对象的概念，他包含从一个模块所有的输出。他们也支持用一个自定义对象替换 `exports` 对象。

默认导出用作这种行为的替代，然而两者是不兼容。TypeScript `export =` 是传统 CommonJS 和 AMD 工作流的模型。

`export = ` 语法指定要从模块输出的单个对象。他可以是类，接口，名称空间，函数，或枚举。当引入使用 `export =` 的模块时，必须用 TypeScript 特定的 `module = require('module')`.

ZipCodeValidator.ts

```ts
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator{
	isAcceptable(s: string){
		return s.length === 5 && numberRegexp.test(s);
	}
}

export = ZipCodeValidator;
```

Test.ts

```ts
import zip = require('./ZipCodeValidator');

// some samples to try
let strings = ['Hello', '98052', '101'];

//Validators to use
let validator = new zip();

// show whether each string passed each validator
strings.forEach(s => {
	console.log(`${ s } - ${ validator.isAcceptable(s)} ? 'matches' : 'does not match'`);
});
```

## Code Generation for Modules

取决于编译时指定的模块目标，编译器将生成用于 Node.js ([CommonJS](http://wiki.commonjs.org/wiki/CommonJS))), require.js([AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)), [SystemJS](https://github.com/systemjs/systemjs), 或 [ECMAScript 2015 native modules](ES6) 模块加载系统。

生成代码中的 `define`, `require` 及 `  ` 调用，参考每个模块加载器的文档。

下面的示例展示了在引入和导出转换成模块加载代码时名称是怎么使用的。

SimpleModule.ts

```ts
import m = require('mod');
export let t = m.something + 1;
```

AMD / RequireJS SimpleModule.js

```js
define(["require", "exports", "./mod"], function (require, exports, mod_1) {
    exports.t = mod_1.something + 1;
});
```
...

## Simple Example

这里，我们合并了之前例子中使用的 Validator 实现，每个模块只导出一个命名的输出。

要编译文件，必须在命令行指定一个模块目标。如，Node.js, 使用 `--module commonjs`, require.js 使用 `--module amd`. 如:

```bash
tsc --module commonjs Test.ts
```

_./Validation.ts_

```ts
export interface StringValidator{
	isAcceptable(s: string): boolean;
}
```

_./LettersOnlyValidator.ts_

```ts
import { StringValidator } from './Validation';

const lettersRegexp = /^[A-Za-z]+$/;

export class LettersOnlyValidator implements StringValidator{
	isAcceptable(s: string): boolean {
		return lettersRegexp.test(s);
	}
	
}
```

_./ZipCodeValidator.ts_

_./Test.ts_

```ts
import { StringValidator } from './Validation';

const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator{
	isAcceptable(s: string): boolean {
		return s.length ===  5 && numberRegexp.test(s);
	}
}
```

```ts
import { StringValidator } from './Validation';
import { ZipCodeValidator } from './ZipCodeValidator';
import { LettersOnlyValidator } from './LettersOnlyValidator';

// some samples to try
let strings = ['Hello', '98052', '101'];

// validators to use

let validators: { [s: string]: StringValidator} = {};

validators['ZIP code'] = new ZipCodeValidator();
validators['Letters only'] = new LettersOnlyValidator();

// show whether each string passed each validator
strings.forEach(s => {
	for(let name in validators){
		console.log(`"${ s }" - ${validators[name].isAcceptable} ? 'matches' : 'does not match' ${ name }`);
	}
});
```

## Optional Module Loading and Other Advanced Loading Scenarios

有时，你可能想在某些条件下加载某个模块。在 TypeScript 中, 我们可以使用下面展示的模式来实现这种情形和其他高级的加载情形，直接调用模块加载器而不丢失类型安全。//既然如此也可以使用动态 `import()`

编译器侦测输出的 JavaScript 中是否每个模块都用到了，如果一个模块标识符只用于类型声明但从未用于表达式，那不会生成用于那个模块的 `require` 调用。忽略无用的引用是好的性能优化，而且也允许可选地加载这些模块。

这种模式的核心概念是 `import id = require('...')` 语句给我们访问模块暴露出的类型。正如下面 `if` 块中显式的那样，模块加载器是动态调用的 (通过 `require`)。这对引用消除优化施加影响，所以模块只在需要时加载。

。。。

## Working with Other JavaScript Libraries

描述不是用 TypeScript 写的库的外形，我们需要声明库暴露的 API.

我们称声明不是实现叫 "ambient". 通常是在 `.d.ts` 文件中定义的。如果你熟悉 C/C++, 可以想象一下 `.h` 文件。让我们看几个例子。

### Ambient Modules

Node.js 中，大多任务由加载一个或多个模块完成。

我们可以在每个模块自己的 `.d.ts` 文件中顶层定义输出声明，但把他们写在一个大 `.d.ts` 文件中更方便一些。To do so, we use a construct similar to ambient namespaces, but we use the module keyword and the quoted name of the module which will be available to a later import.

如:

node.d.ts (simplified excerpt)

```ts
import { ParsedUrlQuery } from 'querystring';

    export interface UrlObjectCommon {
        auth?: string;
        hash?: string;
        host?: string;
        hostname?: string;
        href?: string;
        path?: string;
        pathname?: string;
        protocol?: string;
        search?: string;
        slashes?: boolean;
    }

    // Input to `url.format`
    export interface UrlObject extends UrlObjectCommon {
        port?: string | number;
        query?: string | null | { [key: string]: any };
    }

    // Output of `url.parse`
    export interface Url extends UrlObjectCommon {
        port?: string;
        query?: string | null | ParsedUrlQuery;
    }

    export function parse(urlStr: string, parseQueryString?: boolean, slashesDenoteHost?: boolean): Url;
    export function format(URL: URL, options?: URLFormatOptions): string;
    export function format(urlObject: UrlObject | string): string;
    export function resolve(from: string, to: string): string;

    export interface URLFormatOptions {
        auth?: boolean;
        fragment?: boolean;
        search?: boolean;
        unicode?: boolean;
    }

    export class URLSearchParams implements Iterable<[string, string]> {
        constructor(init?: URLSearchParams | string | { [key: string]: string | string[] | undefined } | Iterable<[string, string]> | Array<[string, string]>);
        append(name: string, value: string): void;
        delete(name: string): void;
        entries(): IterableIterator<[string, string]>;
        forEach(callback: (value: string, name: string) => void): void;
        get(name: string): string | null;
        getAll(name: string): string[];
        has(name: string): boolean;
        keys(): IterableIterator<string>;
        set(name: string, value: string): void;
        sort(): void;
        toString(): string;
        values(): IterableIterator<string>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
    }

    export class URL {
        constructor(input: string, base?: string | URL);
        hash: string;
        host: string;
        hostname: string;
        href: string;
        readonly origin: string;
        password: string;
        pathname: string;
        port: string;
        protocol: string;
        search: string;
        readonly searchParams: URLSearchParams;
        username: string;
        toString(): string;
        toJSON(): string;
    }

decalre module "path"{
	export function normalize(p: string): string;
	export function join(...paths: any[]): string;
	export var sep: string;
}
```

现在我们可以用 `/// <reference> node.d.ts` 然后使用 `import url = require('url');` or `import * as URL from "url"`

```ts
/// <reference path="node.d.ts">
import * as URL from 'url';
let myUrl = URLparse('http://www.typscript.org');
```

### Shorthand ambient modules

如果你在使用新模块前不想花时间写声明文件，你可以使用简写快速开始。

declarations.d.ts

```ts
declare module 'hot-new-module';
```

从简写模块的所有引入都将是 `any` 类型。

```ts
import x, { y } from 'hot-new-module';
```

### Wildcard module declarations

一些模块加载器如 [SystemJS](https://github.com/systemjs/systemjs/blob/master/docs/overview.md#plugin-syntax)) 和 [AMD](https://github.com/amdjs/amdjs-api/blob/master/LoaderPlugins.md) 允许引入非 JavaScript 内容。这些通常使用前缀或后缀指出特殊的加载句意。通配符模块可用于这种情形。

```ts
declare module "*!text" {
    const content: string;
    export default content;
}

// some do it the other way around
declare module "json!*" {
    const value: any;
    export default value;
}
```

现在你可以加载匹配 `"*!text"` 或 `"json!*"` 的东西啦。

_./wildcard-declarations/index.ts_

```ts
import fileContent from './xyz.txt!text';
import data from 'json!http://example.com/data.json';
```

### UMD modules

一些库设计的可用于许多模块加载器或不用模块加载器 (全局变量)。这些是 [UMD](https://github.com/umdjs/umd) 或 [Isomorphic](http://isomorphic.net) 模块。这些库可用 `import` 或一个全局变量访问。

如：

math-lib.d.ts

```ts
export const isPrime(x: number): boolean;
export as namespace mathLib;
```

## Guidance for structuring modules

__Export as close to top-level as possible__

你模块导出的东西对于使用者应尽量少些歧义。

添加太多的嵌套层次会变得笨重，所以仔细考虑下怎样组织合适。从你的模块导出一个名称空间是添加太多嵌套层次的一个示例。名称空间有时虽然有其用处，但他们添加了使用模块时的额外的间接层次。用户很快就会感到痛苦，而且这常常也是不必要的。导出类上的静态方法也有类似的问题 —— 类本身就是一层嵌套。除非有助于表达或打算以清淅有用的方式，如果不是就考虑下只是导出一个帮助函数 (helper function).

__If you're only exporting a single `class` or `function`, use `export default`__

正如 "exporting near the top-level" 减少使用者的歧义，引入一个默认输出也是如此。

如果一个模块的主要目的是用作一个特写的输出，那你应该考虑将其输出为一个默认输出。这使得引入和使用引入都有点方便。

例如：

MyClass.ts

```ts
export default class SomeType{
    consturctor(){...}
}
```

MyFun.ts

```ts
export default function getThing(){
    return 'thing';
}
```

Consumer.ts

```ts
import t from './MyClass';
import f from './MyFunc';
let x = new f();
console.log(f());
```

这对使用者来是很好的。他们想怎么命名都可以 (这里用 `t`)而不必有过多的点来查找对象。

__If you're exporting multiple objects, put them all at top-level__

MyThings.ts

```ts
export class SomeType {
    /* ... */
}
export function someFunc(){
    /* ... */
}
```

反过来，在引入时：

__Explicity list imported names__

Consumer.ts

```ts
import { SomeType, someFunc } from './MyThings.ts';
let x = new SomeType();
let y = new someFunc();
```

__Use the namespace import pattern if you're importing a large number of things__

MyLargeModule.ts

```ts
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }
```

Consumer.ts

```ts
import * as myLargeModule from './MyLargeModule.ts';
let x = new myLargeModule.Dog();
```

__Re-export to extend__

常常你需要扩展一个模块的功能。CommonJS 的模式是用扩展增加原来的对象，类似于 JQuery 的扩展。

之前提到过，模块不会全局名称空间对象一样合并。推荐的解决方法是不修改原对象，而是输出一个有新功能的新的实体。

考虑 `Calculator.ts` 中现现的计算器。这个模块也输出一个帮助函数用于测试计算功能。

_./re-export-to-extend/Calculator.ts_

```ts
export class Calculator{
	private current = 0;
	private memory = 0;
	private operator: string;

	protected processDigit(digit: string, currentValue: number){
		// processDigit 可能不返回值，但为什么类型推断返回类型为 number
		// 参见[类型推断](/type-inference/)
		if(digit >= '0' && digit <= '9'){
			return currentValue * 10 + (digit.charCodeAt(0) - '0'.charCodeAt(0))
		}
	}

	protected processOperator(operator: string){
		if(['+', '-', '*', '/'].indexOf(operator) >= 0){
			return operator;
		}
	}

	protected evaluateOperator(operator: string, left: number, right: number): number{
		switch(operator){
			case '+': return left + right;
			case '-': return left - right;
			case '*': return left * right;
			case '/': return left / right;
		}
	}

	private evaluate(){
		if(this.operator){
			this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
		}else{
			this.memory = this.current;
		}
		this.current = 0;
	}

	public handelChar(char: string){
		if(char === '='){
			this.evaluate();
			return;
		}else{
			let value = this.processDigit(char, this.current);
			// value 推断为 number 类型，为什么还可以是 undefined ok
			if(value !== undefined){
				this.current = value;
				return;
			}else{
				let value = this.processOperator(char);
				if(value != undefined){
					this.evaluate();
					this.operator = value;
					return;
				}
			}
		}

		throw new Error(`Unsupported input: ${char}`);
	}

	public getResult(){
		return this.memory;
	}
}

export function test(c: Calculator, input: string){
	for(let i = 0; i < input.length; i++){
		c.handelChar(input[i]);
	}

	console.log(`result of '${input}' is '${c.getResult()}'`);
}
```

这里是一个使用输出的 `test` 函数是简单测试。

TestCalculator.ts

```ts
import { Calculator, test } from "./Calculator";


let c = new Calculator();
test(c, "1+2*33/11="); // prints 9
```

现在扩展支持不是以10为其数的数字，让我们创建 `ProgrammerCalculator.ts`

_./re-export-to-extend/ProgrammerCalculator.ts_

```ts
import { Calculator } from './Calculator';

class ProgrammerCalculator extends Calculator{
	static digits = ['0', '1', '2', '3', '4', '5',"6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

	constructor(public base: number){
		super();
		if(base <= 0 || base > ProgrammerCalculator.digits.length){
			throw new Error('base has to be within 0 to 16 inclusive.');
		}
	}

	protected processDigit(digit: string, currentValue: number){
		if(ProgrammerCalculator.digits.indexOf(digit) >= 0){
			return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
		}
	}
}

export { ProgrammerCalculator as Calculator };

export { test } from './Calculator';
```

新模块 `ProgrammerCalculator` 输出了一个类似原模块 `Calculator` 的外形的 API, 但没有增加原始模块中的对象。

这里是 `ProgrammerCalculator` 类的测试：

TestProgrammerCalculator.ts

```ts
import { Calculator, test } from "./ProgrammerCalculator";

let c = new Calculator(2);
test(c, "001+010="); // prints 3
```

__Do not use namespaces in modules__

当首次转向基于模块的组织，常见的倾向是将输出用一个额外的名称空间包装。

模块有自己的作用域，输出的声明对模块外可见。记着这一点，当处理模块时，名称空间提供很少，如果有的话，的值。

On the organization front, 用名称空间在全局作用域中分组逻辑相关的对象是很方便的。如在 C# 中，你会发现所有的集合类型都在 System.Collections 下。将类型组织在有层级的名称空间中，对于这些类型的使用者是很好的 “discovery” 体验。

模块，另一方面，已需要地出现在文件第统中。我们可以在 `/collections/generic/` 中放一些模块。

名称空间可以避名全局作用域中的命名冲突。例如，我可能有一个 `My.Application.Customer.AddForm` 及 `My.Application.Order.Addform` —— 两个类型都同样的名称，但在不同的名称空间中。而这对模块来说并不是问题。

在一个模块中，没有道理两个对象有同样的名称。站在使用者的角度，任何给定模块的使用者可以选一个用来引用模块的名称，所以不可能有命名冲突的。

> 更多关于模块和名称空间的讨论见 [Namespaces and Modules].

__Red Flags__

以下都是模块组织的红色警示。如果有任何以下规则适用你的文件，再次检查下你没有试图用名称空间组织你的外部模块。

- 一个文件的外层声明是 `export namespace Foo{ ... }` (移除 `Foo` 再向上移一个层次)

- 一个文件只有一个 `export class` 或 `export function` (考虑使用 `export default`)

- 多个文件外层都有同样的 `export namespace Foo{` (别以为这会合并成一个 `Foo`!)

