# Symbol

`Symbol()` 函数返回一个符号 (symbol) 类型的值。`Symbol` 有一些静态属性暴露内置对象中一些成员的，也有一些静态方法暴露全局符号注册库，`Symbol` 很像内置的对象类，但并不完成因为他不支持 "`new Symbol()`" 语法。

<!-- Symbol 应该是个函数，但不是构造函数，只有静态属性和静态方法。为什么不把 Symbol 变成静态类呢？-->

`Symbol()` 返回的每个符号 (symbol) 值都是独一无二的。一个符号值可用于对象属性标识符，这是这个数据类型的唯一目的。更多关于其目的及其用法的解释见 [glossary enter for Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol).

符号数据类型是一个[基本数据类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)。

```js
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// expected output: "symbol"

console.log(symbol3.toString());
// expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
// expected output: false
```

## Syntax

```
Symbol([description])
```

__description__ | `Optional`

可选的，字符串. symbol 描述可用于调试，但不能用来访问 symbol 本身。

## Description

要创建一个基本的 symbol, 调用 `Symbol()` 并传递一个可选的字符串作为描述。

```js
var sym1 = Symbol();
var sym2 = Symbol('foo');
var sym3 = Symbol('foo');
```

上面的代码创建了3个 symbols. 注意 `Symbol("foo")` 不强迫 symbol 中有字符串 "foo". 每次都创建一个新的 symbol:

```js
Symbol('foo') === Symbol('foo'); // false
```

下面有 [new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) 操作符的语法会抛出 [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

```js
var sym = new Symbol(); // TypeError
```

这防止用户创建明确的 `Symbol` 包装对象而非一个新的 symbol 值，你可能会感到吃惊因为对基本值创建包装对象这样做通常是可以的 (如, `new Boolean`, `new String` 及 `new Number`).

如果你真想创建 `Symbol` 包装对象，你可以使用 `Object()` 函数：

```js
var sym = Symbol('foo');
typeof sym;             // "symbol"
var symObj = Object(sym);
typeof symObj;          // "object"
```

## Shared symbols in the global symbol registry

上面使用 `Symbol()` 函灵敏的语法不会创建整个代码中可用的全局的 symbol. 要创建跨文件甚至跨区域 (realms) 的 symbols, 使用 [Symbol.for()]() 及 [Symbol.keyFor()]() 来从全局 symbol 注册库中设置或取回 symbol.

## Finding symbol properties on objects

[Object.getOwnPropertySymbols()]() 返回一个 symbols 数组使得你可以找到给定对象上的 symbol 属性。注意每个对象初始化时并没有自己的 symbol 属性，所以这个数组可能是空的，除非你给这个对象设置了 symbol 属性。

## Properties

`Symbol.length`

长度属性其值为0。// 为什么我也不知

`Symbol.prototype`

### Well-known symbols

除了你自己的 symbols, JavaScript 有内置的 symbols 用于表示内部的语言行为，这对 ECMAScript 5 及其之前的版本没有暴露给开发者。可通过以下属性访问这些 symbols.

__Iteration symbols__

[Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)

一个方法，用于返回一个对象的默认遍历器 (iterarot). [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 将会使用这个方法。

[Symbol.asyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)

返回一个对象的异步遍历器的方法。用于 `for await of`

__Regular expression symbols__

`Symbol.match`

这个函数由 `String.prototype.match` 内部调用。Regexp.prototype.exec 有相似的作用。`Symbol.match` 存在的作用在于为继承 `RegExp` 的子类提供自定义匹配行为。

`Symbol.replace`

`Symbol.search`

`Symbol.split`

__Other symbols__

`Symbol.hasInstance`

`Symbol.isConcatSpreadable`

`Symbol.unscopables`

`Symbol.species`

`Symbol.toPrimitive`

`Symbol.toStringTag`

## Methods

[Symbol.for(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for)

搜索有指定 key 的现有 symbol, 如果找到就返回他。否则使用这个 key 在全局 symbol 注册库中创建一个新的 symbol.

[Symbol.keyFor(sym)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor)

从全局 symbol 注册仓库中返回给定 symbol 的共享的 symbol key.

## `Symbol` prototype

所有 Symbols 都继承自 [Symbol.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/prototype)

`Symbol.prototype.constructor`

返回创建实例原型的函数。默认是 Symbol 函数。

`Symbol.prototype.toSource()`

`Symbol.prototype.toString()`

`Symbol.prototype.valueOf()`

`Symbol.prototype[@@toPrimitive]`

## Examples

__Using the `typeof` operator with symbols

用 [typeof]() 操作符识别 symbols 很有用。

```js
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'
```

__Symbol type conversions__

当处理 symbols 类型转换时要注意以下几点。

- 当尝试将 symbol 转换为 number 时，会抛出 [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) (e.g. `+sym` 或 `sym | 0`)

- 当使用宽松相等时，`Object(sym) == sym` 返回 `true`

- `Symbol('foo') + 'bar'` 抛出 [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。这防止你用 symbol 静默地创建一个新字符串属性，例如。

- ["safer" String(sym) conversion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion) 类似于调用 [Symbol.prototype.toString()](), 而 `new String(sym)` 会报错。


__Symbols and `for...in` iteration__

Symbols 不可用 [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) 遍历。而且，[Object.getOwnPropertyNames()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) 将不会返回 symbol 对象属性，不过你可以使用 [Object.getOwnPropertySymbols()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) 获取这些属性。

```js
var obj = {};
obj[Symbol('a')] = 'a';
obj[Symbol.for('b')] = 'b';
obj['c'] = 'c';
obj.d = 'd';

for(var i in obj){
    console.log(i); // logs "c" and "d"
}
```

__Symbols and `JSON.stringify()`__

当使用 `JSON.stringify()` 时 Symbol 为键的属性将完全被忽略掉:

```js
JSON.stringify({[Symbol('foo')]: 'foo'});
// '{}'
```

详情见 [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

__Symbol wrapper objects as property keys__

当一个 Symbol 包装对象用作一个属性值时，这个对象将强制被转换为其包装的 symbol:

```js
var sym = Symbol('foo');
var obj = {[sym]: 1};
obj[sym];           // 1
obj[Object(sym)];   // still 1
```

## Specifications

