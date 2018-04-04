`构造函数返回 _this` ?

//28 行

```js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function () {
    var Person = (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var Employee = (function (_super) {
        __extends(Employee, _super);
        function Employee(name, department) {
            var _this = _super.call(this, name) || this;
            _this.department = department;
            return _this;
        }
        Employee.prototype.getElevatorPitch = function () {
            return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
        };
        return Employee;
    }(Person));
    var howard = new Employee('Howard', 'Sales');
    console.log(howard.getElevatorPitch());
    //[ts] Property 'name' is protected and only accessible within class 'Person' and its subclasses.
    console.log(howard.name);
})();

```

`为什么要设置 prototype 的属性？`

```ts
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string{
        return this._fullName;
    }

    set fullName(newName: string){
        if(passcode == 'secret passcode'){
            this._fullName = newName;
        }else{
            console.log('Error: Unauthorize update of employee!');
        }
    }
}

let employee = new Employee();
employee.fullName = 'Bob Smith';
if(employee.fullName){
    console.log(employee.fullName);
}
let employe2 = new Employee();
employe2.fullName = "Bob";
console.log(employe2.fullName);
console.log(employee.fullName);
```

```js
var passcode = "secret passcode";
var Employee = (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode == 'secret passcode') {
                this._fullName = newName;
            }
            else {
                console.log('Error: Unauthorize update of employee!');
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee();
employee.fullName = 'Bob Smith';
if (employee.fullName) {
    console.log(employee.fullName);
}
var employe2 = new Employee();
employe2.fullName = "Bob";
console.log(employe2.fullName); //Bob
console.log(employee.fullName); //Bob Smith
```

`.d.ts`

Classes > Accessor

> 当从你代码生成 `.d.ts` 文件时是有帮助的，因为你属性的用户可以看到他们不能改变他。

`返回类型时推断出来的吗？`

```ts
function buildName(firstName: string, lastName: string){
    return firstName + ' ' + lastName;
}
```

```ts
//也是类型推断出来的吗？
let myAdd = function(x: number, y: number): number { return x + y; };

//完整的类型
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

```

Functions > Function Types > Typing the function

> TypeScript can figure the return type out by looking at the return statements, so we can also optionally leave this off in many cases.

> The second part is the return type. We make it clear which is the return type by using a fat arrow (=>) between the parameters and the return type. As mentioned before, this is a required part of the function type, so if the function doesn’t return a value, you would use `void` instead of leaving it off.