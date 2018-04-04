# General Types

## `Number`, `String`, `Boolean`, and `Object`

不要使用 `Number`, `String`, `Boolean` 或 `Object` 这些型。这些指非基本包装对象，在 JavaScript 代码中从来没有正确使用过。

```ts
/* Wrong */
function reverse(s: string): String;
```

使用 `number`, `string`, 及 `boolean` 类型。

```ts
/* ok */
function reverse(s: string): string;
```

使用 [TypeScript 2.2](/docs/object-type) 新加的非基本值 `object` 类型而非 `Object`

## Generics

不要有不使用类型参数的泛型。

详情见 [TypeScript FAQ page](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-type-inference-work-on-this-interface-interface-foot---)

# Callback Types

## Return Types of Callbacks

不要将返回类型 `any` 应用于返回值应忽略的回调：// 这些回调不应有返回值

```ts
/* Wrong */
function fn(x: () => any){
    x();
}
```

对返回值应忽略的回调要使用 `void` 返回类型：

```ts
/* OK */
function fn(x: () => void) {
    x();
}
```

为什么：使用 `void` 安全点，因为他防止你无意间使用 `x` 的返回值：

```ts
function fn(x: () => void) {
    var k = x(); // oops! meant to do something else
    k.doSomething(); // error, but would be OK if the return type had been 'any'
}
```

## Optional Parameters in Callbacks

除非真正需要，否则不要在回调中使用可选参数:

[parameters-in-callback.ts](./parameters-in-callback.ts)

```ts
interface Fetcher{
    getObject(done: (data: any, elapsedTime?: number) => void): void
}
```

这有非常特定的含义：`done` 回调可能调用时有1个参数，也可能以2个参数调用。作者可能想说这个回调不关心 `elapsedTime` 参数，但没有必要这样做--回调接收少点的参数总是合法的。

请把回调中的参数写成非可选的：

```ts
/* OK */
interface Fetcher {
    getObject(done: (data: any, elapsedTime: number) => void): void;
}
```

## Overloads and Callbacks

不要写只是回调中参数 (arity) 不同的重载：

```ts
/* WRONG */
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```

写一个有最多参数 (maximum arity) 的重载：

```ts
/* OK */
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```

为什么：回调不理会参数也是合法的，所以没必要有更短的重载。

先提供一个更短的回调允许传递不正确的函数，因为匹配了第一个重载。// make sense

# Function Overloads

## Ordering

不要把更通用的重载放在更具体的重载前：

```ts
/* WRONG */
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: any, wat?
```

请把更通用的重载签名放在更具体重载签名后：

```ts
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```

为什么：当解析函数调用时，TypeScript 选择第一个匹配的重载。

当前面有个重载比后面的更通用，那后面的被隐藏掉并不能被调用。

## Use Optional Parameters

不要写只是结尾参数有区别的重载：

```ts
/* Wrong */
interface Example{
    diff(one: string): number;
    diff(one: string, two: string): number;
    diff(one: string, two: string, three: boolean): number;
}
```

尽可能使用可选参数：

```ts
/* Ok */
interface Example{
    diff(one: string, two?: string, three?: boolean): number;
}
```

注意这种折叠只适用于所有的重载都有同样的返回类型的情形。

为什么：有两点原因很重要。

TypeScript 兼容性地解析签名，他查看目标签名是否可以以源参数调用，_允许额外的参数_。

例如，这段代码, 当签名使用可选参数时会暴露一个 bug.

```ts
function fn(x: (a: string, b: number, c: number) => void){

}

var Example;

// When written with overloads, Ok -- used first overload

// When written with optionals, correctly an error
fn(x.diff);
```

二是用户使用 TypeScript 的 "strict null checking" 特色。

在 JavaScript 未指定的参数是 `undefined`, 给可选参数传递 `undefined` 也是可以的。

这段代码，如，在 "strict null checking" 下是 Ok 的。

```ts
var x: Example;

// When written with overloads, incorrectly an error because of passing 'undefined' to 'string'
// When written with options, correctly OK
x.diff('something', true ? undefined : 'hour');
```
// 使用重载时要注意！

## Use Union Types

不要写只有参数类型有区别的重载：

```ts
/* Wrong */
interface Moment{
    utcOffset(): number;
    utcOffset(b: number): Moment;
    utcOffset(b: string): Moment;
}
```

尽可能的使用联合类型：

```ts
/* ok */
interface Moment{
    utcOffset(): number;
    utcOffset(b: number|string): Moment;
}
```

注意，这里我们并没有让 `b` 成为可选参数，因为返回类型签名不同。

为什么：对给你函数传值的人来说这是很重要的：

```ts
function fn(x: string): void;
function fn(x: number): void;
function fn(x: number|string){
    // ?
    // When written with separate overloads, incorrectly an errorv
    // When written with union types, correctly OK
    return moment().utcOffset(x);
}
```