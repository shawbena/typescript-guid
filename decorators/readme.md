# Decorators

随着 TypeScript 和 ES6 引入了类，一些情形需要一些特色来支持注解或修改类及类成员。

装饰符为类及其成员提供了注解及一种元编程的语法的方式。

装饰符是 JavaScript [stage 2](https://github.com/tc39/proposal-decorators) 提案，是 TypeScript 中的试验性特色。

> NOTE&emsp; 装饰符是试验性特色，未来的发布版本可能会有变化。

要启用装饰符这种试验性特色，在命令行或你的 `tsconfig.json` 中启用 `experimentalDecorators` 选项。

```sh
tsc --target ES5 --experimentalDecorators
```

tsconfig.json:

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

## Decorators

装饰器是一种特殊的声明，可以附给 [class declaration](#class-decorators), [method](#method-decorators), [ancessor](#ancessor-decorators), [property](#property-decorators) 或 [parameter](#parameter-decorators). 装饰符使用 `@expression` 的形式, `expression` 必须求值为函数，在运行时将以装饰的声明信息调用该函数。

如，装饰符 `@sealed`, `seal` 函数可能是这样：

```ts
function sealed(target){
        // do something with 'target' ...
}
```

> Note&emsp; 详细示例见下面的 [Class Decorators](#class-decorators)。

## Decorator Factories

如果你想自定义一个装饰符如何应用于一个声明，可以写一个装饰器工厂。

*装饰器工厂* (Decorator Factorey) 仅仅是一个函数，运行时装饰器调用他来返回表达式。

```ts
function color(value: string){ // 装饰器工厂
    return function(target){ // 装饰器
        // 使用 target 和 value 干点什么事...
    }
}
```

> Note&emsp; 装饰器工厂详细的示例见下面的 [Method Decorators](#method-decorators)

## Decorator Composition

一个声明可有多个装饰器，如下示例：

* 在一行：

```ts
@f @g x
```

* 在多行

```ts
@f
@g
x
```

当多个装饰器应用于单个声明时，求值类似于 [function composition in mathematics (复合函数)](https://en.wikipedia.org/wiki/Function_composition). 这个模型中，当复合函数 *f* 和 *g*, 结果是 (*f* ∘ *g*)(*x*) 等同于 *f*(*g*(*x*))。

于是，在 TypeScript 中当对单个声明求值多个个装饰器是执行以下步骤：

1. 每个装饰器表达式自顶向下求值 (top-to-bottom)

2. 结果函数调用从上向上 (bottom-to-top)

如果你使用[装饰器工厂](#decorator-factories), 我们可以用以下示例观测这种求值顺序：

```ts
function f(){
    console.log("f()": evaluated);
    return function(target, propertyKey: string, descriptior: PropertyDescriptior){
        console.log('f(): called');
    }
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```

将会在控制台打印以下信息：

```shell
f(): evaluated
g(): evaluated
g(): called
f(): called
```

## Decorator Evalutation

There is a well defined order to how decorators applied to various declarations inside of a class are applied:

1. *Parameter Decorators*, followed by *Method*, *Accessor*, or *Property Decorators* are applied for each instance member.
2. *Parameter Decorators*, followed by *Method*, *Accessor*, or *Property Decorators* are applied for each static member.
3. *Parameter Decorators* are applied for the constructor.
4. *Class Decorators* are applied for the class.

## Class Decorators

*类装饰器* (Class Decorator) 声明在类声明前。

类装饰器应用于类的构造函数，可用于观测，修改，或替换类定义。

类装饰器不能用于声明文件中，也不能用于环境语境中 (ambient context) (如用于一个 `declare` 的类)。

类装饰器表达式在运行时将被用作函数调用一次，装饰的类的构造函数是其唯一参数。

如果类装饰器返回一个值，那么将会替换掉类的声明的构造函数。

> Note&nbsp; 如果你选择返回一个新的构造函数的话，你必须小以维护原来的原型。
> 运行时应用将饰器不会为你做这些事情。

下面是一个类装饰器 (`@sealed`) 应用于 `Greeter` 类：

```ts
@sealed
class Greeter{
    greeting: string;
    constructor(message: string){
        this.greeting = message;
    }
    greet(){
        return "Hello, " + this.greeting;
    }
}
```

我们使用以下函数定义了 `@sealed` 装饰器:

```ts
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
```

当 `@sealed` 执行时，他将封装构造函数和其原型。

接下有个如何覆盖构造函数的示例。

```ts
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```

## Method Decorators

*方法装饰器* (Method Decorator) 在方法声明前声明。

这种装饰符不应用于方法的属性描述符 (Property Descriptior)，可用来观测，修改，或替换一个方法定义，但不能用在声明文件中，不能用于重载也不能用于环境语境 (ambient context) 中。

方法装饰器的表达大在运行时作为函数调用，接收以下三个参数：

1. 对于类的静态函数来说是类的构造函数，对于实例成员来说是类的原型。

2. 成员的名子。

3. 成员的属性描述符。

> NOTE&emsp; 如果你的脚本在低于 `ES5` 的环境中运行，属性描述符 (Property Descriptor) 将会是 `undefined`。

如果装饰器表达式返回一个值，将用作方法的属性描述符。

> NOTE&emsp; 如果你的脚本在低于 `ES5` 的环境中运行，将忽略返回值。

下面是一个就用于 `Greeter` 类的一个方法的方法装器 (`@enumerable`)

```ts
class Greeter {
    greeting: string;
    constructor(message: string){
        this.greeting = message;
    }

    @enumerable(false)
    greet(){
        return "Hello, " + this.greeting;
    }
}
```

我们可以用以下函数声明定义 `@enumerable` 装饰器。

```ts
function enumerable(value: boolean){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        descriptor.enumerable = value;
    }
}
```

## Accessor Decorators

*访问器* 装饰器 (Accessor Decorator) 在访问器声明前声明。

访问器装饰符应用于访问器的 *属性描述符* (PropertyDescriptor)，可用来观测，修改或替换访问器定义。

访问器装饰符不应用于方法的属性描述符 (Property Descriptior)，可用来观测，修改，或替换一个方法定义，但不能用在声明文件中，不能用于重载也不能用于环境语境 (ambient context) 中。

> NOTE&emsp; TypeScript 不允许同时装饰单个成员的 `get` 和 `set` 访问器。
> 而是，成员的所有装饰器必须应用于文档顺序中指定的第一个访问器。
> 这是因为装饰器应用于 *属性描述符* (Property Descriptor), 包括了 `get` 和 `set` 访问器，而非每个声明分开处理。

访问器装饰器将在运行时作为函数调用，接收以下三个参数：

1. 对于类的静态函数来说是类的构造函数，对于实例成员来说是类的原型。

2. 成员名。

3. 成员的 *属性描述符*。

> NOTE&emsp; 如果你的脚本在低于 `ES5` 的环境中运行，属性描述符 (Property Descriptor) 将会是 `undefined`。

如果装饰器表达式返回一个值，将用作成员的属性描述符。

> NOTE&emsp; 如果你的脚本在低于 `ES5` 的环境中运行，将忽略返回值。

下面是一个访问器装饰器 (`@configurable`) 的应用于 `Point` 类的一个成员：

```ts
class Point{
    private _x: number;
    private _y: number;
    constructor(x: number, y: number){
        this._x = x;
        this._y = y;
    }
    @configurable(false)
    get x(){
        return this._x
    }

    @configurable(false)
    get y(){
        return this._y
    }
}
```

我们以以下函数声明定义 `@configurable` 装饰器：

```ts
function configurable(value: boolean){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        descriptor.configurable = value
    }
}
```

## Property Decorators

*属性装饰器* 在属性声明前声明。

属性装饰器不能在声明文件中使用，也不能在环境语境 (ambient) 中使用 (如 `declare` 类中)。

属性装饰器表达式将在运行时调用，接收两个参数：

1. 对于类的静态函数来说是类的构造函数，对于实例成员来说是类的原型。

2. 成员名。

> NOTE&emsp; 由于属性装饰器在 TypeScript 中初始化的方式，不给属性装饰器提供 *属性描述符* (Property Descriptor) 参数。这是因为当前在定义原型的成员时没有描述实例属性的机制，无法观测或修改属性的初始化 (器)。

因此，一个属性装饰器只能用于观测类已经声明的特定属性。

我们可以使用这点信息来记录关于属性的元数据，如下示例：

```ts
class Greeter{
    @format("Hello, %s")
    geeeting: string;
    constructor(message: string){
        this.greeting = message;
    }
    greet(){
        let formatString = getFormat(this, 'greeting')
        return formatString.replace("%s", this.greeting)
    }
}
```

我们可以使用以下函数声明定义 `@format` 装饰器和 `getFormat` 函数：

```ts
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```

`@format("Hello, %s")` 装饰器这里是一个[装饰器工厂](#decorator-factories)。

当 `@format("Hello, %s")` 调用时，他使用 `reflect-metadata` 库的 `Reflect.metadata` 函数添加属性的元数据入口。

> NOTE&emsp; 这个示例依赖 `reflect-metadata` 库。
> `reflect-metadata` 库的更多信息见 [Metadata](#metadata)

## Parameter Decorators

*参数装饰器* (Parameter Decorator)在参数声明前声明。

参数装饰器应用于类构造函数或方法声明。

参数装饰器不能用在声明文件中，重载中也不可以，也不可以用在任何环境语境中 (如 `declare` 类中)。

参数装饰器表达式将在运行时作为函数调用，接收以下三个参数：

1. 对于类的静态函数来说是类的构造函数，对于实例成员来说是类的原型。

2. 成员名。

3. 参数在函数参数列表中的原始索引。

> NOTE&emsp; 参数装饰器只能用于观测方法中已经声明的参数。
> 参数装饰器的返回器将被忽略。

以下是一个参数装饰符 (`@required`) 应用于 `Greeter` 类成员的参数：

```ts
class Greeter{
    greeter: string;

    constructor(messsage: string){
        this.greeting = message
    }

    @validate
    greet(@required name: string){
        return "Hello " + name + ', ' + this.greeting
    }
}
```

我们使用以下函数声明定义 `@required` 和 `@validate` 装饰器：

```ts
import "reflect-metadata"

const requiredMetadataKey = Symbol("required")

function required(target: Object, propertyKey: string | symbol, parameterIndex){
    let existingReqiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
    Reflect.defineMetadata(requiredMetadataKey, existingRequireParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptior: TypedPropertyDescriptor<Function>){
    let method = descriptor.value;
    descriptor.value = function(){
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if(requiredParameters){
            for(let parameterIndex of requiredParameters){
                if(parameterIndex >= arguments.length || arguments[parameterIndex] === undefiend){
                    throw new Error('Missing required argument.');
                }
            }
        }
        return method.apply(this, arguments)
    }
}
```

`@required` 装饰符添加一个元数据条目标识参数为必有的。

`@validate` 装饰符然后将现有的 `greet` 方法包裹在一个函数中校验参数，然后调用原始方法。

> NOTE&emsp; 这个示例依赖 `reflect-metadata` 库。
> `reflect-metadata` 库的更多信息见 [Metadata](#metadata)

## Metadata

一些示例使用了 `reflect-metadata` 库，这个库添加了 [experimental metadata API](https://github.com/rbuckton/ReflectDecorators). 这个库还不是 ECMAScript 标准的一部分。

然而，一旦装饰符正式被 ECMAScript 标准采用了，这个扩展也将会成为提议。

你可以通过 npm 安装这个库：

```shell
npm i reflect-metadata --save
```

TypeScript 包含了输出有装饰符的声明的某些类型的元数据的试验性支持。

要启用这种试验性支持，必须在命令行或在 `tsconfig.json` 中设置 `emitDecoratorMetadata` 编译选项。

**命令行**：

```shell
tsc --target ES5 --experimentalDecorators --emitDecoratorMetadata
```

**tsconfig.josn**:

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

当启用是，只要引入了 `reflect-metadata` 库，运行时将暴露额外的设计时的类型信息。

我们可以看下下面示例的实际行为：

```ts
// 好牛X的特色
import 'reflect-metadata'

class Point{
    x: number;
    y: number;
}

class Line{
    private _p0: Point;
    private _p1: Point;

    @validate
    set p0(value: Point) { this._p0 = value }
    getp0() { return this._p0 }
    @validate
    set p1(value: Point){ this._p1 = value }
    get p1(){ return this._p1 }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>){
    let set = descriptor.set;
    descriptor.set = function(value: T){
        let type = Reflect.getMetadata('design:type', target, propertyKey)
        if(!(value instance of type)){
            throw new TypeError("Invalid type, expected: " + Object.toString.call(type))
        }
        set(value);
    }
}
```

TypeScript 编译器将使用 `@Reflect.metadata` 装饰符注入设计时的类型信息。

你可以认为下面是 TypeScript 代码是等同的：

```ts
class Line {
    private _p0: Point;
    private _p1: Point;

    @validate
    @Reflect.metadata("design:type", Point)
    set p0(value: Point) { this._p0 = value; }
    get p0() { return this._p0; }

    @validate
    @Reflect.metadata("design:type", Point)
    set p1(value: Point) { this._p1 = value; }
    get p1() { return this._p1; }
}
```

> NOTE&emsp; 装饰符元数据是试验性特色，未来发布的版本可能引入重大变化。

## Note

借助 `reflect-metadata`, 装饰符可以在运行时对类方法，属性进行校验。

## p1

`PropertyDescriptor`

```ts lib.es5.d.ts
interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
```

```syntax
Object.defineProperty(obj, prop, descriptor)
```
```ts
interface ObjectConstructor{
    // ...
    defineProperty(o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): any;
    // ...
}
```