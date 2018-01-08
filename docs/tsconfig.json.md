用 `"include"` 属性指定的的文件可通过 `"exclude"` 过滤。而，明确地用 `"files"` 属性指定的文件总会包括不管 `"exclude"`. 当未指定时 `"exclude"` 属性默认排队 `node_modules`, `bower_components`, `jspm_packages` 及 `<outDir>` 目录。

# tsconfig.json

目录中 `tsconfig.json` 的出现指明那个目录是 TypeScript 项目的根目录。

`tsconfig.json` 文件指明根文件及编译项目的编译选项。

## Using `tsconfig.json`

- 调用 `tsc` 不指定输入文件，这样编译器将从当前目录开始搜索 `tsconfig.json` 文件，并沿父目录向上。

- 调用 `tsc` 不带输入文件及 `--project` (或 `-p`) 命令选项指明包含 `tsconfig.json` 文件的路径，或包含配置的一个有效的 `.json` 文件。

当在命令行指明了输入文件，`tsconfig.json` 被忽略。

## Examples

示例 `tsconfig.json` 文件：

使用 `"files"` 属性

```json
{
	"compilerOptions": {
		"module": "commonjs",
		"noImplicitAny": true,
		"removeComments": true,
		"preserveConstEnums": true,
		"sourceMap": true
	},
	"files": [
		"core.ts",
		"sys.ts",
		"types.ts",
		"scanner.ts",
		"utilities.ts",
		"checker.ts",
		"emitter.ts",
		"program.ts",
		"commandLineParser.ts",
		"tsc.ts",
		"idagnosticInformationMap.generated.ts"
	]
}
```

- Using the `"include"` and `"exclude"` properties

```json
{
	"compilerOptions": {
		"module": "system",
		"noImplicitAny": true,
		"removeComments": true,
		"outFile": "..../built/local/tsc.js",
		"sourceMap": true
	},
	"include": [
		"src/**/*"
	],
	"exclude": [
		"node_modules",
		"**/*.spec.ts"
	]
}
```

### Details

`compilerOptions` 属性可以忽略，这样会使用编译器的默认值。见支持的[编译选项](/docs/compiler-options.md)

`"files"` 属性接收相对或绝对的文件路径列表。`"include"` 和 `"exclude"` 属性接受 glob-like 文件模式。

支持的 glob 通配符：

- `*` 匹配0或多个字符 (不包括目录分隔符)

- `?` 匹配任意一个字符 (不包括目录分隔符)

- `**/` 递归匹配任何子目录

如果 glob 模式只包括 `*` 或 `.*`, 那只包括有支持的扩展名的文件 (如 `.ts`, `.tsx` 及 `.d.ts`, 如果 `allowJS` 设为 true 默认有 `.js` 和 `.jsx`)

如果 `"files"` 及 `"include"` 都未指定，编译器默认包含包含目录及子目录除 `exclude` 属性指定的所有的 TypeScript 文件 (`.ts`, `.d.ts` 及 `.tsx`)。如果 `allowJs` 为 true 也包含 JS 文件 (`.js` 及 `.jsx`).

如果 `"files"` 及 `"include"` 属性都指定了，编译器将包括两个属性包括的文件的并集。`outDir` 编译选项指定的目录中的文件总是被排除在外，除非用 `"files"` 属性明确包括 (即使指定了 `"exclude"` 属性)。

用 `"include"` 指定的文件可用 `"exclude"` 属性过滤。

然而用 `"files"` 明确包含的文件无法用 `"exclude"` 过滤。

`"exclude"` 属性默认排除 `node_modules`, `bower_components`, `jspm_packages` 及 `<outDir>` 如果没有指定的话。

`"files"` 或 `"include"` 属性引用的任何文件也会被包括进来。

同样，如果文件 `B.ts` 被 `A.ts` 引用，那 `B.ts` 不能被排除，除非 `A.ts` 在 `"exclude"` 的列表中指定。

请注意，编译器不会包括可能被输出的文件。如，如果包含 `index.ts`, 那排除 `index.d.ts` 及 `index.js`.

通常，不推推荐仅将扩展名有区别的文件放在一起。

`tsconfig.json` 文件可以完全为空，这将默认以默认的编译选项编译所有文件。

命令行指定的编译选项覆盖 `tsconfig.json` 中指定的选项。


## `@types`, `typeRoots` 及 `types`


## Configuration inheritance with `extends`

## `compileOnSave`

## Schema