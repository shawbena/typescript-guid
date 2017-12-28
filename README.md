# TypeScript Guid

运行时依赖 awesome-typescript-loader 及 source-map-loader

awesome-typescript-loader 帮助 wepback 使用 TypeScript 的标准配置文件 `tsconfig.json`

source-map-loader 使用来自 TypeScript 的输出告知 webpack 何时生成自己的 sourcemaps. 这使得你调试你的最终的输出文件好似调试你的原本的 TypeScript 源代码。

并不只有 awesome-typescript-loader 用于 Typescript. 你也可以使用 [ts-loader](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader), 读下他们的[差异](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader)。

## Add a TypeScript configuration file

你将会相把 TypeScript 文件放在一起 - 你要写的代码及任何需要的声明文件。

要这么做，你需要创建一个 `tsconfig.json` 文件，包含输入文件的列表及你的编译设置。

仅仅在你的项目根目录创建名为 `tsconfig.json` 文件并填充以下内容：

__tsconfig.json__

```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```

你可以多了解一下 [`tsconfig.json`](/tsconfig.json/)

。。。

我们只从 'hello.jsx' 引入了 `Hello` 组件。

不像 `'react'` 和 `'react-dom'`, 我们引用 `hello.txt` 使用了相对路径 - 这是重要的。如果不这样做，TypeScript 将会从 `node_modules` 文件夹中查找。
