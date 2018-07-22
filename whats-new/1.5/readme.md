# TypeScript 1.5

## ES6 Modules

TypeScript 1.5 支持 ECMAScript 6 (ES6) 模块。ES6 模块是带有新语法有效的 TypeScript 外部模块：ES6 模块是单独加载的源文件，可能引入其他模块及提供外部可访问的输出。ES6 模块的特色是一些新的输出和引入声明。推荐 TypeScript 库和应用升级为新语法，不过这不是必须的。新的 ES6 模块语法与 TypeScript 原始的内部和外部模块构造共存而且可以混用。

### Export Declarations

## Destructuring in declarations and assignments

TypeScript 1.5 添加 ES6 解构声明和赋值支持。

...

## `namespace` keyword

TypeScript 使用 `module` 关键字定义内部模块和外部模块，对于 TypeScript 新手来说可能会有些困惑。内部模块接近于大多人称为的名称空间；类似的，JS 中外部模块现在是模块。

> 注意：仍然支持之前定义内部模块的语法。

之前：

```ts
module Math{
    export function add(x, y){...}
}
```

之后：

```ts
namespace Math{
    export function add(x, y){...}
}
```

## `let` and `const` support

当目标是 ES3 及 ES5 时现在支持 `let` 和 `const` 声明。

...

## `for...of` support

TypeScript 1.5 添加 ES6 for...of ES3/ES5 数组支持，当目标是 ES6 时提供完整的遍历器支持。

。。。未完结。。。

