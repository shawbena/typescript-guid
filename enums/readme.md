# Enums

枚举允许我们定义命名的数值常量集合。

枚举使用 `enum` 关键字定义。

```ts
enum Direction {
	Up = 1,
	Down,
	Left,
	Right
}
```

枚举体包含0或多个枚举成员。枚举成员有与其关联的数值，可以是常量或计算而来。

一个枚举成员被视为常量如果：

- 没有初始器而且前面的枚举成员是一个常量。这种情形，当前枚举成员的值是前面枚举成员的值加上1。一个特例是枚举的第一个元素，如果他没有初始器，将赋给他 `0`.

- 枚举成员以常量枚举表达式初始化。常量枚举表达式是 TypeScript 表达式子集，可以完全在编译时求值。一个表达式是常量枚举表达式如果他是下列中的一个：

 - 数值字面量

 - 先前定义的常量枚举成员 (可以是不同枚举中字义的)。如果是同一枚举中定义的成员，可以使用非限定 (unqualified name) 名引用.

 - 括号常量枚举表达式。
 - `+`, `-`, `~` 一元操作符应用到常量枚举表达式

 - `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 二元操作符，常量枚举表达式为操作数。求值为 `NaN` 或 `Infinity` 的常量枚举表达式会造成错误。

其他情形的枚举成员被视为计算而来。

_./index.ts_

```ts
enum FileAccess{
	// constant members
	None,
	Read = 1 << 1,
	Write = 1 << 2,
	ReadWrite = Read | Write,
	// computed member
	G = '123'.length
}
```

枚举是运行时真实存在对象。一个原故是维持枚举值到枚举名的映射。

_./2.ts_

```ts
enum Enum {
	A
}

let a = Enum.A;
let nameOfA = Enum[a]; // 'A'
```

编译为：

```ts
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // 'A'
```

在生成的代码中枚举被编译成一个存储向前 (`name` -> `value`) 和反向 (`value` -> `name`) 映射的对象。

对枚举成员的引用总是生成属性访问并且不是内联的。

在大多情况下这是相当有效的解决方法。而有时需要是苛刻的。避免访问枚举值时额外生成的代码及附加的间接的代码，可以使用常量枚举。

常量枚举在 `enum` 前放置 `const` 修饰符。

_./3.ts_

```ts
const enum Enum {
	A = 1,
	B = A * 2
}
```

常量枚举只能使用常量枚举表达式而且不像常规的枚举，他们在编译时完全被移除。

常量枚举在使用的地方被内联。

这也是可能的，因为常量枚举不能有计算的成员。

_./4.ts_

```ts
const enum Directions {
	Up,
	Down,
	Left,
	Right
}

let directions = [Directions.Up, Direction.Down, Direction.Left, Direction.Right];
```

在生成的代码中将会是：

```js
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## Ambient enums

Abmient 枚举用于描述已经存在的枚举的形。

```ts
declare enum Enum{
	A = 1,
	B,
	C = 2
}
```

Ambient 和 非 Ambient 枚举的一个重要区别是，在常规的枚举中，成员没有初始器的枚举被认为是常量成员。对于没有初始器的非常量 ambient 枚举成员被视为计算而来。//?
