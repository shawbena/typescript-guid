import 'reflect-metadata'
const formatMetadataKey = 'format'

function format(formatString: string){
    // 返回一个装饰器
    // function decorator(target, propertyKey){...}
    return Reflect.metadata(formatMetadataKey, formatString)
}

function getFormat(target: any, propertyKey: string){
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}

class Greeter{
    @format("Hello, %s")
    greeting: string;

    constructor(message: string){
        this.greeting = message
    }

    greet(){
        let formatString = getFormat(this, 'greeting')
        return formatString.replace('%s', this.greeting)
    }
}

let greet = new Greeter('World');
console.log(greet.greet());
greet.greeting = 'shaw'
console.log(greet.greet());


