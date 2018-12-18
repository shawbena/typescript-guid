# Declaration Merging

TypeScript 中一些独特的概念描述类型层的 JavaScript 对象的形状。TypeScritp 独有的概念的一个示例是声明合并 (declaration merging)。理解这个概念，在处理现有 JavaScript 时将会给你带来优势。他也打开更高级抽像概念的大门。

这篇文章的目的，声明合并意味着编译器将名称相同的声明合并单独的声明为单个定义。

合并的声明带有有原始声明的特色。可以合并任何数量的声明，而不仅限于两个声明。

## Basic Concepts

在 TypeScript 中，一个声明至少创建三组实体中的一组：名称空间，类型或值。

名称空间创建声明创建一个名称空间，其包含用点表示法访问的名称。

类型创建声明做的是：创建一个可见的声明的形状并绑定到一个给定的名称。

最后，值创建声明创建输出的 JavaScript 中可见的值。

...

理解每个声明创建了什么将有助于理解执行声明合并时合并了什么。

## Merging Interfaces

最简单，或许是最常见的声明合并类型是接口合并。最基本的是合并机制将所有声明的成员合并到一个有同样名称的接口中。

```ts
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

let box: Box = {height: 5, width: 10, scale: 1.5}
```

非函数成员应该是唯一的。 // 函数可以有重载

如果不唯一，应该是同一类型。

如果接口都声明了同样名称的非函数成员，而是不同的类型，那么编译器将报告错误

对于函数成员，同名的每个函数成员都被视为同一函数的重载描述。值得注意的是，接口A合并另稍后的接口A，第二个接口比第一个接口有更高的优先级。

即，在这个示中：

```ts
interface Cloner {
    clone(animal: Animal): Animal;
}

interface Cloner {
    clone(animal: Sheep): Sheep;
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}
```

三个接口将合并成如下的单个声明：

```ts
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
```

注意每组元素维持同样的顺序，但后续合并的的分组重载顺序排前。

这个规则的一个例外是特定的签名。如果一个签名有一个类型为单个字符串字面量类型的参数 (不是字符串字面量联合体)，然后他将冒泡到其合并的重载列表的最顶端。<!-- 定义的具体值不能按照后来居上的原则 -->

例如，下面的接口将会合并：

```ts
interface Document{
    createElement(tagName: any): Element;
}
interface Document{
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}
```

`Document` 的合并结果是：

```ts
interface Document{
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}
```

## Merging Namespaces

类似于接口，同名的名称间也将合并他们的成员。因为名称空间创建一个名称空间和一个值，我们需要理解两者是怎么合并的。

要合并名称空间，每个名称空间中声明的输出的接口的类型定义合并，形成单个具有合并的接口定义的名称空间。

为了登并每个声明站点的名称空间值，如果一个名称空间已经存在给定的名称，会拿现有的名称空间扩展他，向第一个名称空间添第二个名称空间输出的成员。

这个示例中的 `Animals` 声明的合并：

```ts
namespace Animals {
    export class Zebra{

    }
}

namespace Animals{
    export interface Animals {
        numberOfLegs: number;
    }
    export class Dog{}
}
```

等同于: 

```ts
namespace Animal{
    export interface Legged {
        numberOfLegs: number;
    }

    export class Zebra{}
    export class Dog{}
}
```

名称空间的合并是一个有帮助的起点，但我们需要知道没有输出的成员发生了什么。

百输出的成员只在原来 (没有合并的) 的名称空间中可见。这意味着合并之后没有输出的成员对来自其他声明的合并成员不可见。

这个示例中我们看得更明白：

```ts
namespace Animal{
    let haveMuscles = true;

    export funtion animalsHaveMuscles(){
        return haveMuscles;
    }
}

namespace Animal {
    export function doAnimalsHaveMuscles(){
        return haveMuscles; // error, haveMuscles 这里是不可见的。
    }
}
```

因为 `haveMuscles` 并没有输出，只有享有同一未合并名称空间的 `animalsHaveMuscles` 函数可以看见些符号。

`doAnimalsHaveMuscles` 函数，即使是合并的 `Animal` 名称空间的成份，但不能看见这个没有输出的成员。

## Merging Namespaces with Classes, Funcitons, and Enums

名称空间灵活的也可以与其也类型的声明合并。要这样，名称空间必须遵守与其合并的声明。结果声明将有两种声明类型的属性。

TypeScript 使用这种方式模仿 JavaScript 及其他语言中的一些模式。

### Merging Namespaces with Classes

这个向你表示描述内部类的方式。

```ts
class Album{
    label: Album.AlbumLabel;
}

namespace Album{
    export class AlbumLabel{}
}
```

合并的成员的可见性规则同 "Merging Namespace" 节中的描述，所惟我们必须输出 `AlbumLabel` 类，这样合并后的类才能看到他。

最终的结果是一个类内部管理着另一个类。

你也可以使用名称空间为现有类添加静态成员。

除了内部类这种模式，可能你也熟悉 JavaScript 中创建一个函数，然后扩展函数，添加一个属性的实践。TypeScript 使用声明合并以类型安全的方式 (type-safe) 来构建这样的模块。

```ts
function buildLabel(name: string): string{
    return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel{
    export let suffix = "";
    export let prefix = "Hello, "
}

alert(buildLabel("Sam Smith"))
```

同样也可以为枚举扩展静态成员：

```ts
enum Color{
    red = 1,
    green = 2,
    blue = 4
}

namespace Color{
    export function mixColor(colorName: string){
        if(colorName == "yellow"){
            return Color.red + Color.green
        }
        if(colorName == "white"){
            return Color.red + Color.green + Color.blue
        }
        if(colorName == "cyan"){
            return Color.green + Color.blue
        }
    }
}
```

## Disallowed Merges

TypeScript 中并非允许所有类型的合并。

目前，类不能与其他类或变量合并。

要想模拟类合并，见 [Mixins in TypeScript]()

## Module Augmentation

## Gloabl augmentation

在模块中也可以添加全局作用哉的声明：

```ts
// observable.ts

export class Observable<T>{
    // .. still no implementaion ...
}

declare global {
    interface Array<T>{
        toObservable(): Observable<T>;
    }
}
Array.prototype.toObservable = function(){
    // ...
}
```