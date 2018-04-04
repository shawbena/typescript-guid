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

// why?
let a: JSX.Element = <ComponentFoo name={"hh"} X={1} Y={2} />;

const Button = (props: {value: string}, context: { color: string }) => <button />;
