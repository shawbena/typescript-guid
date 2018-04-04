# Classes

传统的 JavaScript 使用函数和基于原型的继承来构建可重用的组件，但这对适应了面向对象方式，类继承功能且对象构建自类的编程人员很尴尬。从 ECMAScript 2015 开始，也被称为 ECMAScript 6, JavaScript 编程人员将能够使用这种面向对象基于类的方式构建他们的应用程序。在 TypeScript 中，我们现在就允许开发者使用这些技术，并将他们编译成跨所有主流流览器和平台的 JavaScript, 不用待待下个版本的 JavaScript.

让我们看一个简单的基于类的例子：

```ts
class Greeter {
    greeting: string;
    constructor(message: string){
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter('world');
```

这语法看起来类似你在 C# 或 Java 中用过。我们声明了一个新类 `Greeter`. 这个类有三个成员：一个属性 `greeting`, 一个构造函数，一个 `get` 方法。

你会注意到在类中我们引用类的成员前面加 `this.`. 这表示是一个成员访问。

在最后一行我们用 `new` 构造一一个 `Greeter` 类的实例。这调用我们之前定义的构造函数，用 `Greeter` 的外形创建一个新的的对象，运行构造函数并实例化他。

## Inheritance

在 TypeScript 中，我们可以用常见的面向对象的模式。当然，最基础的是用继承扩展现有的类以创建新的类。

我们来看一个例子：

20.ts

```ts
class Animal {
    name: string;
    constructor(theName: string){
        this.name = theName;
    }
    move(distanceInMeters: number = 0){
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string){
        super(name);
    }
    move(distanceInMeters = 5){
        console.log('Slithering...');
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string){
        super(name);
    }
    move(distanceInMeters = 45){
        console.log('Galloping...');
        super.move(distanceInMeters);
    }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');
```

这个例子只包括其他语言中常见 TypeScript 中有的一些继承的特色。这里我们可以看到用使用 `extends` 关键字创建一个子类。你可以看到 `Horse` 和 `Snake` 变成了 `Animal` 的子类并获得了这种特色。

这个例子也展示了怎么用特写子类的方法覆盖基类中的方法。`Snake` 和 `Horse` 都他建了一个 `move` 方法覆盖掉了来自 `Animal` 的 `move` 方法，给他特写于每个类的功能。注意既使 `tom` 声明为 `Animal`, 由于他的值是 `Horse`, 当 `tom.move(34)` 调用 `Horse` 中覆盖的方法：

```tty
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```

## Public, private, and protected modifiers

`Public by default`

在例子中，我们能自由访问我们程序中声明的成员。如果你熟悉其他语言中的类，你可能已经注意到了在上面的例子中，我们并没有使用 `public`, 在 C# 中，每个可见的成员都要明确标为 `public`. 在 TypeScript 中，每个成员默认是 `public`.

你仍然可以明确地把一个成员标记为 `public`. 我们可以把前面例子中的 `Animal` 类写成下面这样：

```ts
class Animal {
    public name: string;
    public constructor(theName: string){
        this.name = theName;
    }
    public move(distanceInMeters: number){
        console.log(`${this.name} moved ${distanceInMeters}`);
    }
}
```

理解 `private`

当一个成员被标记为 `private`, 不能从他的包含类外访问他。如：

```ts
class Animal {
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}
//[ts] Property 'name' is private and only accessible within class 'Animal'.
new Animal('cat').name;
```

TypeScritp 是一个结构化的类型体系。当我们比较两个类型时，无论他们来自哪里，当所有成员的类型时兼容的，我们说他们自己的类型是兼容的。

然而，当比较的类型有 `private` 和 `protected` 成员时，我们区别地对待这些类型。对于两个视为兼容的类型，如果其中一个有 `private` 成员，那么另一个必须有源自同一声明的 `private` 成员。这同样适用于 `protected` 成员。

让我们看一个例子以更好地理解这在实践中是怎么回事：

```ts
class Animal {
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

class Rhino extends Animal {
    constructor(){
        super('Rhino');
    }
}

class Employee {
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

let animal = new Animal('Goat');
let rhino = new Rhino();
let employee = new Employee('Bob');

animal = rhino;
animal = employee; //Error: 'Animal' and 'Employee' are not compatible
```

这个例子中，我们有一个 `Animal` 和一个 `Rhino`, `Rhino` 是 `Animal`. 我们也有一个新类 `Employee` 就外形而言看起来是一样的。我们创建了这些类的一些实例并并尝试彼此赋值看看会发生什么。因为 `Animal` 和 `Rhino` 共享来自 `Animal` 中同一声明 `private name: string`,  他们是兼容的。而 `Employee` 并非这样。即使 `Employee` 也有一个叫 `name` 的私有成员，但并不是 `Animal` 中声明的。

Understing `protected`

`protected` 修饰符扮演类似 `private` 修饰符的角色，只是声明为 `protected` 的成员也可以被继承类的实例访问。如，

23.ts

```ts
    class Person {
        protected name: string;
        constructor(name: string){
            this.name = name;
        }
    }

    class Employee extends Person {
        private department: string;
        constructor(name: string, department: string){
            super(name);
            this.department = department;
        }
        getElevatorPitch(){
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee('Howard', 'Sales');
    console.log(howard.getElevatorPitch());
    //[ts] Property 'name' is protected and only accessible within class 'Person' and its subclasses.
    console.log(howard.name);
```

注意虽然我们不能在 `Person` 之外使用 `name`, 我们仍然可以在 `Employee` 的实例方法中使用他，因为 `Employee` 继承自 `Person`.

构造函数也可以被标记为 `protected`. 这意味着这个类不能在其包含类之外实例化，但可以被扩展，如，

24.ts

```ts
class Person {
    protected name: string;
    protected constructor(theName: string){
        this.name = theName;
    }
}

//Employeen can extend Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string){
        super(name);
        this.department = department;
    }

    public getElevatorPitch(){
        return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }
}

let howard = new Employee('Howard', 'Sales');
//[ts] Constructor of class 'Person' is protected and only accessible within the class declaration.
// let john = new Person('John');
```

## Readonly modifier

你可能通过使用 `readonly` 关键字使属性只读。只读属性必须在他们声明时或在构造函数中实例化。

```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string){
        this.name = theName;
    }
}

let dad = new Octopus('Man with the 8 strong legs.');
// dad.name = 'Man with the 3-piece suit';
```

`Parameter properties`

上个例子中，我们在 `Octopus` 类中声明了一个只读的成员 `name` 和一个构造函数参数 `theName`. 这是个非常常见的实践。参数属性让你在一个地方创建和实例化属性：

```ts
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string){}
}
```

注意我们是如何丢弃 `theName` 且只在构造函数上使用 `readonly name: string` 参数的简写来创建和实例化 `name` 成员。我们把声明和赋值合并在一处。

参数属性的声明是通过前缀一个构造函数参数一个访问修饰符或 `readonly` 或丙者都有。`private` 用于参数属性声明实例化一个私有成员；类似的 `public`, `protected` 和 `readonly` 也是一样。

## Accessors

TypeScript 支持 getter/setters 方式的对对象成员的访问拦截。这给你对对象成员访问细粒度的控制。

让我们用 `get` 和 `set` 转换一个简单的类。首先，让我们从一个没有 getters 和 setters 的例子开始。

```ts
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = 'Bob Smith';
if (employee.fullName){
    console.log(employee.fullName);
}
```

允许用户随意设置 `fullName` 是相当方便的，但如果用于一时以血来潮可能会给我们带来麻烦。

这个版本中，我们检查确保在用户修改 employee 之前用户有可用的密钥。我们替换掉对 `fullName` 的直接访问，用 `set` 来检查密钥。我们添加一个对应的 `get` 以无缝衔接上个例子。

要证明自己我们的访问器在检查通行证，我们可以修改通行证看下当他不匹配时我们是否得到了警告信息我们没有权力更新 employee.

关于访问器要注意以下几点：

首先，访问器需要你设置编译器输出 ECMAScript 5 或更高的 JavaScript. ECMAScript 3 是不支持访问器的。第二，只有 `get` 没有 `set` 的访问器自动被推断为 `readonly`. 当从你代码生成 `.d.ts` 文件时是有帮助的，因为你属性的用户可以看到他们不能改变他。

## Static Properties

至此，我们只讨论了类的实例成员, 这些是在对象实例化是出现的。我们也可以创建类的静态成员，静态成员在类本身可见而非类实例。这个例子中，我们使用 `static` 的 origin, 他是个用于所有 grids 的泛值。每个实例通过附加类名来访问这个值。类似于在访问实例前面附加 `this.`，这例我们在静态访问面前附加 `Grid.`。

```ts
class Grid {
    static origin = {x: 0, y: 0};

    calculateDistanceFromOrigin(point: {x: number; y: number}){
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }

    constructor(public scale: number){}
}

let grid1 = new Grid(1.0); //1x scale
let grid2 = new Grid(5.0); //5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

## Abstract Classes

抽象类是其他类可以从中继承的基类。不能直接实例化抽象类。和接口不一样，抽象类可能包含其成员的实现细节。`abstract` 关键用于定义抽象类及抽象类中的抽象方法。

```ts
abstract class Animal {
    abstract makeSound(): void;
    move(): void{
        console.log('roaming the earth');
    }
}
```

抽象类中被标记为抽象的方法不包括实现且必须被继承类实现。抽象方法共享接口方法相似的语法。两者都定义方法答名而不用包括方法体。不过抽象方法必须包括 `abstract` 关键字及可能可选的包括访问修饰符。

```ts
abstract class Department {
    constructor(public name: string){

    }

    printName(): void{
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
    constructor(){
        super('Account and Auditing');
    }

    printMeeting(): void{
        console.log('Greeting account reports...');
    }

    generateReports(): void{
        console.log('Generating account reports...');
    }
}

let department: Department;
//[ts] Cannot create an instance of the abstract class 'Department'.
department = new Department();
department = new AccountingDepartment();
department.printName();
department.printMeeting();
//[ts] Property 'generateReports' does not exist on type 'Department'.
department.generateReports();
```

## Advanced Techniques

### Contructor functions

### Using a class as an interface