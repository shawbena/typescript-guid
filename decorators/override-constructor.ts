export default () => {}

@classDecorator
class Greeter{
    property = 'property'
    hello: string
    constructor(m: string){
        this.hello = m
    }
}

function classDecorator<T extends { new (...args:any[]): {}}>(constructor: T){
    return class extends constructor{
        newProperty = 'new property'
        hello = 'override'
    }
}

let greeter = new Greeter('world');
console.log(greeter);