# Library Structures

广义地说，声明文件的结构方式取决于怎样使用库。

在 JavaScript 中有提供库有很多方式，你需要做的是写匹配的声明文件。

这篇指指南主要讲述怎样识别常见的库模式，及如何写匹配那种模式的声明文件。每种主要类型的库结构 [Templeates](./templates) 中都有对应的文件。

你可以从这些模板快速开始。

## Identifying Kinds of Libraries

首先，我们复习下 TypeScript 声明文件可以表示的库的种类。我们将简单介绍下每种库是怎么使用，怎么写的，并列举些一些真实世界中的一些示例库。

辨别库的结构是写其声明文件的第一步。

我们将给些提示怎样基于基结构和其代码辨别结构。依赖其库文档和组织，可能会比其他方式简单些。

我们推荐你觉得更舒服的方式。

### Global Library

一个全局库是可以从全局作用域访问的(如不使用任何形式的 `import`)。

很多库只暴露一个或多个可用的全局变量。

例如，如果你使用 [jQuery](https://jquery.com/), 只要引用 `$` 变量就可使用他：

```js
$(() => { console.log('hello!'); });
```

你常常会见全局库的指南中如何在 HTML 脚本标签中使用那这库：

```html
<script src="http://a.great.cdn.for/someLib.js"></script>
```

如今，大多流行的全局访问的库实际上写为 UMD 库 (see below).

UMD 库文件难于与全局库文档区分开来。

在写全局声明文件前，确保那个库不是 UMD.

#### Identifying a Global Library from Code

全局库代码常常是非常简单的。

一个全局的 "Hello, world" 库可能像这样：

```js
function createGreeting(s){
	return "Hello, " + s;
}
```

或像这样：

```js
window.createGreeting = function(s){
	return "Hello, " + s;	
}
```

当看全局库的代码时，你常常会见：

- 顶层的 `var` 语句或 `function` 声明

- 一个或多个 `window.someName` 赋值语句

- 假设 DOM 基本值，如 `document` 或 `window` 存在

你不会看见：

- 检查模块加载器如 `require` 或 `define` 的使用

- CommonJS/Node.js 风格的引入 `var fs = require("fs");`

- `define(...)` 调用

- 描述怎样 `require` 或引入库的文档

#### Examples of Global Libraries

因为将全局库转换为 UMD 库是很容易的，少量的流行库还是以全局的风格写的。

然而，小的及需要 DOM 的 (或没有什么依赖的库) 可能仍然是全局的。

#### Global Library Template

[global.d.ts](/declaration-files/global.d.ts) 定义了一个 `myLib` 全局库示例。

请确保读下 ["Preventing Name Conflicts" footnote](#preventing-name-conflicts)

### Modular Libraries

一些库只用于模块加载器的环境中。如 `express` 仅用于 Node.js 必须使用 CommonJS 的 `require` 函数加载。

ECMAScript 2015 (也可以说是 ES2015, ECMAScript 6, 及 ES6), CommonJS, 及 RequireJS 也有类似的模块概念 (importing a module).

在 JavaScript CommonJS (Node.js) 中，如，可以这样写：

```js
var fs = require('fs');
```

在 TypeScript 或 ES6 中 `import` 关键字用于同样的目的：

```ts
import fs = require('fs');
```

通常你会见一些模块化的库的文档中有这样的行：

```js
var someLib = require('someLib');
```

或

```js
define(..., ['someLib'], function(someLib){

});
```

对于全局的模块，你可能会在一个 UMD 模块的文档中看到这些示例，所以检查下代码或文档。

#### Identifying a Module Library from Code

模块化的库通常会至少会有以下信息：

- 无条件的调用 `require` 或 `define`

- 如 `import * as a from 'b';` 或 `export c;` 声明

- `exports` 或 `module.exports` 赋值

很少会有：

- window 或 `global` 赋值

#### Examples of Modular Libries

很多流行的 Node.js 库都是模块化家族的成员，如 [express](http://expressjs.com/), [gulp](http://gulpjs.com/), 或 [request](https://github.com/request/request)

### UMD

未完待续。。。

