# Type Inference

本节，我们将讲下 TypeScript 中的类型推断。即，我们将讲下，在哪里及怎样推断类型。

## Basics

在 TypeScript 中，有几个地方当没有明确的类型声明时类型推断用于提供类型信息。如这段代码中：

```ts
let x = 3;
```

变量 `x` 的类型推断为 `number`.

这种推断发生在，初始化变量及成员，设置参数默认值，及确定函数返回类型时发生。

大多情形中，类型推断是直接的。以下，我们将探索下类型推断的一些细微之处。

## Best common type

当从几个表达式推断类型时，这些表达式的类型用于计算出一个 "best common type". 如：

```ts
let x = [0, 1, null];
```

要推断上面代码中 `x` 的类型，我们必须考虑每个数组元素的类型。这里我们给数组类型两种选择： `number` 和 `null`.

最佳公共类型算法考虑每个候选类型，并挑选与所有候选类型兼容的类型。

因为最佳公共类型必须从提供的候选类型选出，有些情形类型们享有一个共同结构，但没有类型是候选类型的超类型。如：

```ts
let zoo = [new Rhino(), new Elephant(), new Snake()];
```

理想情况下，我们想让 `zoo` 推断为 `Animal[]`, 但数组中没有对象是严格上的 `Animal` 类型，我们对数组元素类型不做推断。

要纠正种情形，当没有哪个类型是所有候选类型的超类型时，要明确提供类型。

```ts
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```

当没有发现最佳公共类型，推断结果是联合数组类型，`(Rhino | Elephant | Snkae)[]`.

## Contextual Type

在 TypeScript 中，一些情形，类型推断也可用于其他方向。

这是 "contextual typing" 上下文键入发生在当表达式的类型由其位置暗示。如下：

__./contextual-type/index.ts__

```ts
window.onmousedown = function(mouseEvent){
	console.log(mouseEvent.button); // <- Error
}
```

上面的代码给出了类型错误，TypeScript 类型检查器使用 `Window.onmousedown` 函数推断赋值语句右则的函数表达式的类型。

这么做时，也能推断 `mouseEvent` 参数的类型。

如果上下文推断的类型表达式包含明确的类型信息，上下文类型被忽略。

如果我们写的是以下代码：

```ts
window.onmousedown = function(mouseEvent: any){
	console.log(mouseEvent.button); // <- Now, no error is given
}
```

有明确类型标的函数表达式参数的类型覆盖上下文类型。这样做，应用了上下文类型，所以不会给出错误提示。

上下文类型有很多应用场景。常见的情形包括函数调用的参数，赋值的右侧部分，类型断言，对象方法及数组字面量，及语句的返回类型。

上下文类型也扮演着最佳公共类型的候选类型的角色，如：

```ts
function createZoo(): Animal[]{
	return [new Rhino(), new Elephant(), new Snake()];
}
```

这个例子中，最佳公共类型有4个候选人：`Animal`, `Rhino`, `Elephant` 及 `Snake`. 当然 `Animal`.