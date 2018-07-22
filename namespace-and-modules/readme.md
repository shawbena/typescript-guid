# Namespaces and Modules

> A note about terminology:
> 在 TypeScript 1.5 中，术语发生了变化。
> 内部的 "modules" 是现在的 "namespaces"
> 外部的模块现在叫 "modules", 为了与 [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) 的术语一致, (即 `module X{` 等同于现在的 `namespace X{`)

这种变化规划出了在 TypeScript 中使用 namespaces (之前 "internal modules") 和模块以各种各样的方式组织代码的方式。

更多关于模块的信息见 [Modules](/modules).

更多关于名称空间的信息见 [Namespaces](/namespaces)

## Using Namespaces

名称空间仅仅是全局的命名 JavaScript 对象。

这使得名称空间是一个用起来很简单的结构。

名称空间是 Web 应用程序中组织代码很好的方式，所有的代码都要包括在你 HTML 页面的 `<script>` 标签中。

正如所有的全局污染一样，很难识别组件依赖，尤其是在大型应用中。

## Using Modules

模块和名称空间一样可以有代码也可以包含声明。

主要的区别是模块声明依赖。

模块也依赖加载器 (如 CommonJs/Require.js).

对于小型的 JS 应用模块可能不是最好的选择，但对于大的应用，付出的代价换来的是模块化和维护性的好处。

模块提供更好的代码重用，更强的孤立及更好的用于支持打包的工具。

对于 Node.js 应用，模块是默认和组织代码的推荐方式。

从 ECMAScript 2015 开始，模块成为了语言的原生部分而且应该被所有兼容的引擎实现支持。

因此，对于新项目，模块应该是推荐的代码组织方式。

## Pitfalls of Namespaces and Modules

本节，我们要描述各种常见的使用名称空间和模块中的陷阱，及如何避免他们。

### `/// <reference>`-ing a module

常见的一个错误是尽量使用 `///<reference ... />` 语法引用一个模块文件，而非使用 `import` 语句。

要理两者的差异，我们首先要更解编译器是如何根据 `import` (如 `import x from '...'`;, `import x = require('...')` 等等中的 `...` ) 路径定们模块的类型信息的。编译将尝试查找有合适路径的 `.ts`, `.tsx` 然后是 `.d.ts` 文件。如果找不到特定的文件，然后编译器将查找 `ambient module delcaration` (环境模块声明)。回忆下，这些声明要在 `.d.ts` 文件中声明。

- `myModules.d.ts`

```ts
// In a .d.ts file or .ts file that is not a module:
declare module 'SomeModule'{
    export function fn(): string;
}
```

- `myOtherModule.ts`

```ts
/// <reference path="myModules.d.ts" />
import 8 as m from 'SomeModule';
```

这里的 reference 标签允许我们定位包含环境模块的声明文件。

几个 TypeScript 示例文件也是这样使用 `node.d.ts` 文件的。

### Needless Namespacing

如果你在将程序从名称空间转换为模块，最后写成这样可能会容易些：

- `shapes.ts`

```ts
export namespace Shapes{
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}
```

这里顶层的模块 `Shapes` 包裹了 `Triangle` 和 `Square`，但不知是什么原因。

这对你模块的使用者来说是困惑而且烦人的。

- `shapeConsumer.ts`

```ts
import * as shapes from './shapes';
let t = new shapes.Shapes.Triangle(); // shapes.Shapes?
```

TypeScript 中模块的一个重要特色是两个不同的模块将从不会向同一作用域项献名称。// ?

因为模块的使用者决定赋给什么名称，没有必要有前瞻性地将输出包括在名称空间中。

再次重申一下为什么你不要尽量将你的模块的内容组织在名称空间中，名称空间的通用意义是提供结构的逻辑组织并防止名称冲突。

因为模块文件本身就已经有逻辑分组，其顶层的名称由引入他的代码定义，没有必要对输出的对象使用额外的模块层。

这里是修改后的示例：

- `shapes.ts`

```ts
export class Triangle { /* ... */ }
export class Square { /* ... */ }
```

- `shapeConsumer.ts`

```ts
import * as shapes from './shapes';
let t = new shapes.Triangle();
```

### Trade-offs of Modules

正如 JS 文件和模块间的一一对应关系一样，TypeScript 也有模块源文件和输出的 JS 文件间的对应关系。

一点不好的是不能根据你的目标模块系统合并多个模块源文件 (的输出)。

如当目标是 `commonjs` 或 `umd` 时你不能使用 `outFile` 选项， 但是 TypeScript 1.8 和之后的版本，是[可以](./release%20notes/TypeScript%201.8.md#concatenate-amd-and-system-modules-with---outfile)对 `amd` 或 `system` 目标使用 `outFile` 的。