export default () => {}

function enumerable(value: boolean){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        descriptor.enumerable = value
    }
}

class Greeter{
    greeting: string;
    constructor(message: string){
        this.greeting = message
    }

    @enumerable(false)
    greet(){
        return "Hello, " + this.greeting
    }
}

var greeter = new Greeter("World")
console.log(greeter);