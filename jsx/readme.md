# JSX

[JSX](https://facebook.github.io/jsx/) 是可嵌入的 XML 类似的语法。

注定要将他转换为有效的 JavaScript, 而转换的句意是实现特定的。

JSX 与 [React](http://facebook.github.io/react/) 框架一起流行，但也有其他应用。

TypeScript 支持嵌入，类型检查和直接将 JSX 编译成 JavaScript.

## Basic usage

要使用 JSX 你必须要做两件事。

1. 以 `.tsx` 扩展名命名文件

2. 启用 `JSX` 选项

TypeScript 自带三种 JSX 模式：`preserve`, `react` 及 `react-native`.

这些模式只影响输出阶段 - 类型检查不受影响。

`preserve` 模式将保留 JSX 为输出的一部分以稍后被其他转换步骤使用 (如 [Babel](https://babeljs.io/))).

而且输出将有 `.jsx` 文件扩展。

`react` 模式将输出 `React.createElement`, 在使用前不需要经过 JSX 转换，将以 `.js` 文件扩展输出。

`react-native` 模式等同 `preserve` 他保留了所有的 JSX, 但输出是 `.js` 文件扩展。

|Mode|Input    |OutPut File Extension|
|----|---------|---------------------|
|`preserve`     <div />|<div />|`.jsx`|
|`react`       |<div />|`React.createElement("div")`|`.js`|
|`react-native`|<div />|<div />|`.js`|

你可以使用 `--jsx` 命令行标志或你的 [tsconfig.json](/docs/tsconfig.json.md) 文件中指定此模式。

> 注意：标识符 `React` 是写死的 (hard-coded), 所以你必须确保 React 可用。

## The `as` operator

## Type Checking

为了理解对 JSX 的类型检查，你首先必须要理解固有元素与基于值的元素的区别。

给定一个 JSX 表达式 `<expr />`, `expr `要么引用环境固有的元素 (例如 DOM 环境中的 `div` 或 `span`) 或你创建的自定义组件。

这有两个重要原因：

1. 对于 React 固有元素输出为字符串 (`React.createElement('div')`), 你创建的组件不是 (`React.createElement(MyComponent)`).

2. JSX 元素中传递的属性类型应该不同地查找。固有元素的属性应该是已知固有的，而组件将很想指定自己的属性集。

TypeScript 使用[与 React 同样的约定](http://facebook.github.io/react/docs/jsx-in-depth.html#html-tags-vs.-react-components) 来区分。

一个固有的元素总是以小写字母开头，基于值的元素总是以大写字母开头。

### Intrinsic elements

固有元素在一个特殊的接口 `JSX.IntrinsicElements` 上查找。

```tsx
declare namespace JSX {
	interface IntrinsicElements{
		foo: any
	}
}

// (property) JSX.IntrinsicElements.foo: any
// [ts] 类型“JSX.IntrinsicElements”上不存在属性“foo”。
<foo />; // ok
<bar />; // error
```

上面的示例中，`<foo />` 可用，而 `<bar />` 将造成错误，因为 `JSX.IntrinsicElements` 并没有指定。

> Note: 你可以在 `JSX.IntrinsicElements` 上指定一个捕获所有的字符串索引。
>
> ```jsx
> declare namespace JSX{
> 	interface IntrinsicElements{
>		[elemName: string]: any
>	}
> }
> ```

## Value-based elements

基于值的元素仅仅查找在作用域中的标识符。

```tsx
import MyComponent from './myComponent';

<MyComponent />; // ok
<SomeOtherComponent /> // error
```

定义一个基于值的元素有两种方式：

1. 无状态的函数组件 (SFC)

2. 类组件

因为这两种基于值类型的元素在 JSX 表达式中无法区分，我们首先试着用重载解析以无状态函数组件解析，如果成功，那么我们就完成了对其表达式定义的解析。如果解析失败，我们然后试着作为类组件解析，如果也失败了，我们将报告一个错误。

### Stateless Functional Component

正如名称暗示，这种组件定义为 JavaScript 函数，其第一个参数是一个 `props` 对象。

我们强制其返回类型必须可赋给 `JSX.Element`.

[stateless-function-component](./jsx/stateless-function-component/index.tsx)

```ts
import * as React from 'react';

interface FooProp{
	name: string;
	X: number;
	Y: number;
}

declare function AnotherComponent(props: {name: string}): JSX.Element | null;

function ComponentFoo(props: FooProp): JSX.Element | null {
	return <AnotherComponent name={props.name} />;
}

const Button = (props: {value: string}, context: { color: string }) => <button />;
```

因为 SFC 只是一个 JavaScript 函数，我们也可以使用函数重载。

[overload](./jsx/stateless-function-component/overload.txt)

```tsx
import * as React from 'react';

interface ClickableProps{
	children: JSX.Element[] | JSX.Element;
}

interface HomeProps extends ClickableProps{
	home: JSX.Element;
}

interface SideProps extends ClickableProps{
	side: JSX.Element | string;
}

function MainButton(props: HomeProps): JSX.Element;
function MainButton(prpos: SideProps): JSX.Element;

function MainButton(props: HomeProps | SideProps): JSX.Element{
	if(isHomeProps(props)){
		return <div>Home props.{props.home}</div>
	}else{
		return <div>Side Props. {props.side}</div>;
	}
}

function isHomeProps(props: HomeProps | SideProps): props is HomeProps{
	return (props as HomeProps).home !== undefined;
}
```

### Class Component

也可以限制一个类组件的类型。

然而，为这我们首先要引入两个术语： element class type 及 element instance type.

给定 `<Expr />`, element class type 是 `Expr` 的类型。所以下面的例子中，如果 `MyComponent` 是一个 ES6 类，那类类型就是那个类。如果 `MyComponent` 是一个工厂函数，类类型将会是那个函数。一旦类类型建立了，实例类型将由类类型调用签名和构造函数调用签名的返回类型决定。所以再次，ES6 类的情形，实例类型将会是那个类实例的类型，函数构造函数的情形，将会是从函数返回的值的类型。// 元素类类型，元素实例类型？

```ts
class MyComponent {
  render() {}
}

// use a construct signature
var myComponent = new MyComponent();

// element class type => MyComponent
// element instance type => { render: () => void }

function MyFactoryFunction() {
  return {
    render: () => {
    }
  }
}

// use a call signature
var myComponent = MyFactoryFunction();

// element class type => FactoryFunction
// element instance type => { render: () => void }
```

元素实例类型是有意思的，因为他必须可以赋给 `JSX.ElementClass` 否则会造成一个错误。

默认 `JSX.ElementClass` 是 `{}`. 但可以增加他以限制 JSX 用于适当接口的类型。

```tsx
declare namespace JSX{
	interface ElementClass{
		render: any;
	}
}

class MyComponent{
	render(){}
}

function MyFactoryFunction(){
	return {
		render: () => {}
	};
}

<MyComponent /> // ok
<MyFactoryFunction /> // ok

class NotAValidComponent{}

function NotAValidFactoryFunction(){
	return {};
}

<NotAValidComponent /> // error
<NotAValidFactoryFunction /> // error
```

## Attribute type checking

属性的类型检查的第一步是确定 `element attributes type`.

固有元素和基于值的元素有点不同。

对于固有元素，是 `JSX.IntrinsicElements` 上的属性。

```tsx
declare namespace JSX{
	interface IntrinsicElements{
		foo: {
			bar?: boolean;
		}
	}
}

// element attributes type for 'foo' is '{bar?: boolean}'
<foo bar />
```

对于基于值，有点更复杂。

。。。

## Children Type Checking

## The JSX result type

## Embedding Expressions

## React integration
