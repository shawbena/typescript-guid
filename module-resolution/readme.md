# Module Resolution

> 本节假设你对模块有基本的了解。更多信息请请下 [Modules](/modules/)

编译器用模块解析来弄明输入指向。

考虑 `import { a } from "moduleA"`, 为了检查 `a` 的用法，编译器需要知道他到底表示什么，而且将需要在 `moduleA` 中核对其定义。

这时编译器会问 “`moduleA` 是什么样的？” 虽然这听着有点直接，但 `moduleA` 可能是 `.ts`/`.tsx` 文件的一种，或在你代码依赖的 `.d.ts` 中。

首先编译器将尝试定位代表导入模块的文件。这么做，编译器按照以下两个策略之一：[Classic](#classic) 或 [Node](#node). 这些策略告诉编译器去哪里查找 `moduleA`. 如果这不起作用或模块名不是相对的 (`moduleA` 是)，那么编译器将尝试定们 [ambient module declaration](/modules/#ambient-modules). 接下来我们会讲下非相对的引入。

最后，如果编译器不能解析模块，他将报错。这里，错误将会是这样 `error TS2307: Cannot find module 'moduleA'`.

## Relative vs. No-relative module imports

基于模块引用是相对的还是非相对的将会有不同的解析。

相对引入 (realtive import) 以 `/`, `./` 或 `../` 开始。例如：

- `import Entry from './components/Entry'`

- `import { DefaultHeaders } from '../constants/http';`

- `import '/mod';`

其他引入是非相对的。如：

- `import * as $ from 'jquery'`

- `import { Component } from '@angular/core';`

相对的引入相对于引入文件解析，不能相对于 ambient module declaration.

如果运行时能保证维护相对路径，那你应使用相对引入。

非相对引入可以相对 `baseUrl` 解析，或能过路径映射，我们稍后会讲。也可以解析至 [ambient module declarations](/modules/#ambient-modules). 当引入外部依赖时使用非相对引入。

## Module Resolution Strategies

有两种模块解析策略 [Node](#node) 和 [Classic](#classic). 你可以使用 `--moduleResolution` 标志来指定模块解析策略。

如果不指定，默认 `--module AMD | System | ES2015` 是 `Classic`，否则则是 `Node`。

### Classic

TypeScript 默认的模块解析策略。如今，这个策略主要用于向后兼容。

相对引入相对引入文件解析。所以在 `/root/src/folder/A.ts` 中引入 `import { b } from './moduleB'` 会按以下步骤进行：

1. `/root/src/folder/moduleB.ts`

2. `/root/src/folder/moduleB.d.ts`

对于非相对模块引入，编译器遍历目录树，从包含引入文件的目录开始，尝试定位匹配的定义文件。

如非相对模块 `moduleB` 如在 `/root/src/folder/A.ts` 中引用 `import { b } from 'moduleB'`, 将会在以下位置定位 `'moduleB'`:

1. `/root/src/folder/moduleB.ts`

2. `/root/src/folder/moduleB.d.ts`

3. `/root/src/moduleB.ts`

4. `/root/src/moduleB.d.ts`

5. `/root/moduleB.ts`

6. `/root/moduleB.d.ts`

7. `/moduleB.ts`

8. `/moduleB.d.ts`

### Node

这个解析策略尝试模仿 [Node.js](https://nodejs.org/) 运行时模块解析策略。完整的 Node.js 解析算法在 [Node.js module documentation](https://nodejs.org/api/modules.html#modules_all_together)

### How TypeScript resolves modules

## Additional module resolution flags

### Base URL

### Path mapping

### Virtual Directories with `rootDirs`

## Tracing module resolution

## Using `--noResolve`

## Common Questions