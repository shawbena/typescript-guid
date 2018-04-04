import * as React from 'react';

class MyComponent{
	render(){

	}
}

// use a contruct signature
let myComponent = new MyComponent();

// element class type => MyComponent
// element instance type => { render: () => void }
function MyFactoryFunction(){
	return {
		render: () => {

		}
	};
}

// use a call signatrue
let myComponent2 = MyFactoryFunction();

// element class type => FactoryFunction
// element instance type => { render: () => void}