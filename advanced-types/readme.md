# Intersection Types

交叉类型结合多个类型为一个。这使得你能将现有类型加在一起得到你需要的所有特色的一个单一类型。

如, `Person & Serializable & Loggable` 是一个 `Person` 和 `Seializable` 及 `Loggable`.

这意味着这个类型有三种类型的所有成员。

你大多见交叉类型用于混合及其他概念，不适合经典的面向对象的模型。(JavaScript 中有很多！)

下面这个示例展示怎样创建一个 mixin:

[index.ts](./index.ts)

```ts
function extend<T, U>(first: T, second: U): T & U{
	let result = <T & U>{};
	for(let id in first){
		(<any>result)[id] = (<any>first)[id];
	}
	for(let id in second){
		if(!result.hasOwnProperty(id)){
			(<any>result)[id] = (<any>second)[id];
		}
	}
	return result;
}

class Person{
	constructor(public name: string){

	}
}

interface Loggable {
	log(): void;
}

class ConsoleLogger implements Loggable {
	log(){
		// ...
	}
}

let jim = extend(new Person('Jim'), new ConsoleLogger());
let n = jim.name;
jim.log();
```

# Union Types