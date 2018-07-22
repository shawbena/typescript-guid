# Namespaces

> A note about terminology:
> 在 TypeScript 1.5 中，术语发生了变化。
> 内部的 "modules" 是现在的 "namespaces"
> 外部的模块现在叫 "modules", 为了与 [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) 的术语一致, (即 `module X{` 等同于现在的 `namespace X{`)

这种变化规划出了在 TypeScript 中使用 namespaces (之前 "internal modules") 以各种各样组织代码的方式。

正如我们在开头的术语中提至的，"inernal modules" 现在称为 "namespaces".

而且，任何可用 `module` 关键字声明内部模块的地方，都可以而且应该用 `namespace` 关键字。

## First steps

### Validators in a single file

```ts
interface StringValidator {
    isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}

class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: StringValidator; } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        let isMatch = validators[name].isAcceptable(s);
        console.log(`'${ s }' ${ isMatch ? "matches" : "does not match" } '${ name }'.`);
    }
}
```

## Namespacing

当我们添加更多的 validators, 我们将要想使用某种类型的组织体系，以便追踪我们的类型并且不用担心与其他对象的名称冲突。

让我们把我们的这么多不同的名称包裹在一个名称空间中而非都放在全局名称空间中。

因为我们想要接口和类在名称空间外可见，我们以 `export` 为开头。相反，变量 `lettersRegexp` 和 `numberRegexp` 是实现细节，我们不想输出他们，不想让他们对名称空间外的代码可见。

在文件底部的代码中，当在名称空间外使用时，我们现在需要限定类型的名称，如 `Validation.LettersOnlyValidator`.

## Splitting Across Files

随着应用的增长，我们想把代码分割至多个文件中以便维护。

### Multi-file namespaces

这里，我们把我们的 `Validation` 名称空间放在了多个文件中。即使是分开放置，他们每个也可以贡献给同样的名称空间好像他们都在一个地方定义一样。因为存在文件间的依赖，我们将添加引用标签 (reference tag) 告诉编译器文件间的关系。不用改动我们的测试代码。

__Validation.ts__

```ts
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

__LettersOnlyValidator.ts__

```ts
/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}
```

__ZipCodeValidator.ts__

```ts
/// <reference path="Validation.ts" />
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```

__Test.ts__

```ts
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(""" + s + "" " + (validators[name].isAcceptable(s) ? " matches " : " does not match ") + name);
    }
}
```

一旦涉及多个文件，我们需要确保所有编译的代码都加载了。这里有两种方式。

首先，我们可以使用 `--outFile` 标志告诉编译器合并所有输入文件为一个 JavaScript 输出文件：

```bash
tsc --outFile sample.js Test.ts
```

编译器将根据文件中出现的 reference 标签自动排序输出文件。你也可以单独指定每个文件:

```bash
tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
```

我们也可以选择每个文件都编译 (默认) 每个输入文件都输出一个 JavaScript 文件。

如果生成了多个 JS 文件，我们需要在我们的网页用 `<script>` 标签以适当的顺序加载每个输出文件，如：

__MyTestPage.html__

```html
<script src="Validation.js" type="text/javascript" />
<script src="LettersOnlyValidator.js" type="text/javascript" />
<script src="ZipCodeValidator.js" type="text/javascript" />
<script src="Test.js" type="text/javascript" />
```

## Aliases

另一种简化名称空间使用的方式是使用 `import q = x.y.z` 创建常用对象的短名称。不要与 `import x = require('name')` 加载模块的语法混淆了，这个语法只创建指定的符号的别名。

你可以将这种形式的引入 (通常称作别名) 用于任何种类的标识符，包括从模块引入创建的对象。

```ts
// Shape.ts
namespace Shapes {
    export namespace Polygons{
        export class Triangle{
        }
        export class Square{}
    }
}

// shape.test.ts
/// <reference path="Shapes.ts" />

import polygons = Shapes.Polygons; // 并非 ES6 语法，只是 TypeScript 的特性罢了

let sq = new polygons.Square(); // same as 'new Shapes.Polygons.Square()'
```

```js
// shape.test.js
/// <reference path="Shapes.ts" />
var polygons = Shapes.Polygons;
var sq = new polygons.Square(); // same as 'new Shapes.Polygons.Square()'
```

注意，我们并未使用 `require` 关键字，而是使用我们引入的符号的限定名直接赋值。

这类似于使用 `var`, 但也适用于引入的符号的类型和名称空间的含义。

对于值类型，`import` 区别于引用源符号，所以改变别名并不会在源变量上反映出来。// javascript 的特性

## Working with Other JavaScript Libraries

要描述不是以 TypeScript 写的库的外形，我们要声明库暴露的 API.

由于大多 JavaScript 只暴露几个顶层对象，用名称空间描述他们倒不错。

我们称声明但不定义实现叫 "ambient". <!-- /* ambient */ -->这些通常在 `.d.ts` 文件中定义。如果你熟悉 C/C++，你可以把他们当作 `.h` 文件。让我们看些示例。

### Ambient Namespaces

流行的 D3 库在一个叫做 `d3` 的全局变量中定义其功能。

由于这个库是通过 `<script>` 标符加载的 (而非模块加载器)，他的声明使用名称空间定义其外形。为了让 TypeScript 编译器能看见这个外形，我们使用 ambient 名称空间声明。例如，我们可以这样开始：

__D3.d.ts (片段)__

```d.ts
declare namespace D3{
    export interface Selections {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        }
    }

    export interface Event{
        x: number;
        y: number;
    }

    export interface Base extends Selectors{
        event: Event;
    }
}

declare var d3: D3.Base;
```

#

在 `Shapes.ts` 中声明的 `Shape` 名称空间好像只对同级文件可见。在其他目录中要使用 `reference` 指令引入才能使用，如：

__./Shapes.ts__

```ts
namespace Shapes{
    export namespace Polygons{
        export class Triangle{}
        export class Square{}
    }
}
```
__../index.ts__

```ts
/// <reference path="namespaces/Shapes.ts" />
let shape = new Shapes.Polygons.Square();
```

这里的 Shape.ts 并非 ES6 模块，在外部文件中要使用 `reference 指令引入`。

也可以把 Shape.ts 当作模块使用，这时把 `Shapes` 名称空间当作可输出和可引入的符号就好：

```ts
// ./Shapes.ts
// 也可以使用默认输出，都可以的
export namespace Shapes{
    export namespace Polygons{
        export class Triangle{}
        export class Square{}
    }
}

// ../index.ts
import { Shapes } from './namespaces/Shapes';
let shape = new Shapes.Polygons.Square();

// ok with namespace aliase
// good feature
import polygons = Shapes.Polygons;
```

##

内部模块现在是名称空间，外部模块现在是模块。

ES6 默认导出不能用于名称空间：

```ts
// shapes.ts
// ok
export namespace Shapes{
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}
```

```ts
// shapes.ts
// [ts] 找不到名称“namespace”。
export default namespace Shapes{
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}
```

__@types/react/index.d.ts__

```ts
export = React;
export as namespace React; // default alias? no, es6 module export? not sure
declare namespace React{
    /* ... */
}
```
