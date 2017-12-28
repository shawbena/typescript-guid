# Basic Types

有用的程序，我们需要能处理最简单的数据单元： numbers, strings, structures, boolean 值, 等等。

TypeScript 中，我们支持很多你期望的 JavaScript 中的类型，有方便的帮助你处理事情。

## Boolean

最基本的数据类型是简单的 true/fale 值，JavaScript 和 TypeScript 都叫 `boolean` 值。

```ts
let isDone: boolen = false;
```

## Number

和 JavaScript 中一样，TypeScript 中的所有数字都是浮点值。这些浮点值的类型是 `number`. 除了十六进制和十进制字面量，TypeScript 也支持 ECMAScript 2015 引入的二进制和八进制字面量。

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## String

以 JavaScript 创建程度用于 web 页面或服务器是另一基本是部分是处理文本数据。像其他语言一样，我们使用 `string` 类型指这些文本数据。就像 JavaScript 一样，TypeScript 也用双引号或单引号包围字符串数据。

```ts
let color: string = "blue";
color = 'red';
```

你也可以用模板字符串，他可跨多行并可以嵌入表达式。这些字符串由倒引号包围, 嵌入表达式是以 `${ expr }` 的形式。

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```

这等同于声明这样的的 `sentence`:

```ts
let sentence: string = "Hello, my name is " + fullName + ".\n\n" + 
"I'll be " + (age + 1) + " years old next month."
```

## Array

TypeScript 像 JavaScript 一样，允许你使用数组值。数组类型可以有两种方式。一是类型后跟 `[]` 以表示什么类型元素数组。第二种方式使用泛型数组类型， `Array<elemType>`

```ts
let list: number[] = [1, 2, 3];
```

第二种方式是使用泛型数据类型， `Array<elemType>`:

```ts
let list: Array<number> = [1, 2, 3];
```

## Tuple

## Enum

enum 是对 JavaScript 标准的数据类型集合的补充，其他语言如 C# 中，enum 是一种给数值值集合更友好名子的一种方式。

```ts
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
```

默认，枚举从 `0` 开始为成员编号。你也可以手动设置成员值。例如，我们让先前的例子从 `1` 而不是从 `0` 开始：

```ts
enum Color { Red = 1, Green, Blue };
let c: Color = Color.Green;
```

或是设置所有枚举值：

```ts
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green;
```

枚举的一个方便的特色是你可以从数值值找到枚举中那个值的名称。

例如，如果你有一个值 `2` 便不确定他在 `Color` 枚举的映射，我们可以查找对应的名称：

```ts
enum Color =  { Red = 1, Green, Blue }
let colorName: string = Color[2];

alert(colorName);
```

## Any

我们可能需要描述一些我们写应用程序时不知道的类型的变量。这些值可能来自动态内容，如来自用户或第三方库。这种情形我们倾向于不用类型检查，让这些值通过编译检查。要这样做，我们用 `any` 类型标记：

```ts
let notSure: any = 4;
notSure  = 'maybe a string instead';
notSure = false; // okay, definitely a boolean
```

`any` 类型是处理现有 JavaScritp 代码强有力的方式，使得你可以渐进的选择编译时用或不用类型检查。

你能觉得 `Object` 扮演着同样的角色，其他语言中是。`Object` 类型的变量仅允许你给他们赋任何类型的变量，但你不能调用任意的方法，即使实际上存在这样的方法。

如果你知道部分类型而或许非全部类型，`any` 也是很有用的。例如，你有一个数组，但是数组有混合类型的元素：

```ts
let list: any[] = [1, true, "free"];
list[1] = 100;
```
## Void

`void` 与 `any` 有点小像：缺失任何类型。常见的是作为不返回值是函数的返回类型。

```ts
function warnUser(): void{
    alert('This is my warning message');
}
```

声明 `void` 类型的变量没什么用，你只能赋给他 `undefine` 或 `null`

```ts
let unsable: void = undefined;
```

## Null and Undefined

在 TypeScript 中, `undefined` 和 `null` 实际上相应地有其自己的类型 `undefined` 和 `null`. 类似 `void`, 并没有多少卵用。

```ts
//not much else we can assign to these variables
let u: undefined = undefined;
let n: null = null;
```
但是 `null` 和 `undefined` 是其他类型的子类开。这意味着你可以把 `null` 和 `undefined` 赋给如 `number`.

然而，当使用 `--strictNullChecks` 标志时，`null` 和 `undefined` 只能赋给 `void` 和其相对应的类型。这有助于避免一些常见的错误。如果你想传递 `string` 或 `null` 或 `undefined`, 你可以使用联合类型 `string | null | undefined`. 稍后会讲联合类型。

> 我们鼓励尽可能使用 `--strictNullChecks`，但这篇手册我们假设他是关闭的。

## Never

`never` 类型表示从未出现的值的类型。
。。。

## Type assertions

有时你可能遇到这样的情形，你比 TypeScript 更了解一个值。通常是当你知道一些实体的类型比当前类型更特定时会出现这种情形。

类型断言告诉编译器，“相信我，我知道我在做什么”。类型断言像其他语言中的类型投影，但是没有特殊的检查和数据重构。他没有运行时的冲击，纯粹由编译器使用。TypeScript 假设，你已经执行了你需要的任何特殊的检查。

类型断言有两种形式。一种是 "angle-bracket" 语法：

```ts
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length
```
另一种是 `as` 语法

```ts
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;
```

两个例子是等同的。使用一个而使用另一个大多是口味不同。然而，当使用 TypeScript 和 JSX 时，只允许使用 `as` 式的断言。

## A note about `let`

目前为止，你应该注意到我，我们一直在使用 `let` 而非 JavaScript 的 `var` 关键字。`let` 关键字实际是是一个 TypeScript 中可用的新的 JavaScript 概念。我们稍后会详细讨论，JavaScript 中常见的问题使用 `let` 可以得到缓解，所以我们建议尽呆能使用 `let` 而非 `var`.