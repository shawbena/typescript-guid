# `Symbol.match`

`Symbol.match` 指定区配的是正则表达式而非字符串。`String.prototype.match()` 方法会调用这个函数

此函数用于标识对象是否具有正则表达式的行为。如 `String.prototype.startsWith()`, `String.prototype.endsWith()` 和 `String.prototype.includes()` 这些方法会检查第一个参数是否是正则表达式，如果是的话抛出 `TypeError`. 现在，如果 `match` symbol 设为 `false` (或可为假的值)，指出对象不打算用作正则表达式对象。

示例：

```js
'/bar/'.startsWith(/bar/); 
// Uncaught TypeError: First argument to String.prototype.startsWith must not be a regular expression
//     at String.startsWith (<anonymous>)
//     at <anonymous>:1:9

// Throws TypeError, as /bar/ is a regular expression
// and Symbol.match is not modified.
```

然而，如果 `Symbol.match` 设为 `false`, 那 `isRegExp` 检查 (使用 `match` 属性) 将指出这个对象不是正则表达式对象。`srartsWith` 和 `endsWith` 便不会抛出 `TypeError` 错误。

```js
var re = /foo/;
re[Symbol.match] = false;
'/foo/'.startsWith(re); // true
'/baz/'.endsWith(re);   // false
```

## `RegExp.prototype[@@match]()`

对字符串参数执行一次匹配搜索。

demo:

```js
class RegExp1 extends RegExp {
  [Symbol.match](str) {
    var result = RegExp.prototype[Symbol.match].call(this, str);
    if (result) {
      return 'VALID';
    }
    return 'INVALID';
  }
}

console.log('2012-07-02'.match(new RegExp1('([0-9]+)-([0-9]+)-([0-9]+)')));
// expected output: "VALID"
```

```syntax
regexp[Symbol.match](str)
```

`str`: 要匹配的字符串。

返回值，包含整个匹配结果和捕获的匹配组的数组，如果没有匹配返回 null.

这个方法由 `String.prototype.match()` 内部调用。例如，下面两个示例返回同样的结果。

```js
'abc'.match(/a/);
/a/[Symbol.match]('abc');
```

这个方法的存在用于在 `RegExp` 子类中自定义匹配行为。

这个方法几乎和 `String.prototype.match()` 用法一样，只是 `this` 和参数顺序不同：

```js
var re = /[0-9]+/g;
var str = '2016-01-02';
var result = re[Symbol.match](str);
console.log(result); // ['2016', '01', '02']
```

`RegExp` 的子类可以重载 (override) `[@@match]()` 方法修改默认行为。

```js
class MyRegExp extends RegExp{
    [Symbol.match](str){
        var result = RegExp.prototype[Symbol.match].call(this, str);
        if(!return){ return nul};
        return {
            group(n){
                return result[n];
            }
        };
    }
}

var re = new MyRegExp('([0-9]+)-([0-9]+)-([0-9]+)');
var str = '2016-01-02';
var result = str.match(re); // String.prototype.match calls re[@@match]
console.log(result.group(1)); // 2016
console.log(result.group(2)); // 01
console.log(result.group(3)); // 02
```

##

Symbol.match 主要用于 RegExp 子类的 prototype[Symbol.match] 的自定义行为，然后被 String.prototype.match() 用来当参数。// i see

以后可能 String 类有更多的方法支持 RegExp.prototype[Symbol.match], RegExp.prototype[Symbol.replace]... 这些特性。。。

String.prototype.startsWith, String.prototype.endsWith 可能只是个试验品。

RegExp.prototype[Symbol.match] 可赋 boolean 值可能也只是这开始。 