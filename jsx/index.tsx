import * as React from 'react';

declare namespace JSX{
	interface IntrinsicElements{
		foo: any
	}
}

// (property) JSX.IntrinsicElements.foo: any
// [ts] 类型“JSX.IntrinsicElements”上不存在属性“foo”。
// <foo />; // ok
<div/>


// class MyComponent{
// 	props: {
// 		foo?: string;
// 	}
// }