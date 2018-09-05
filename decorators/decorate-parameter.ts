import 'reflect-metadata'

const requiredMetaDataKey = Symbol('required');

function required(target: Object, propertyKey: string | symbol, parameterIndex: number){
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetaDataKey, target, propertyKey) || []
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetaDataKey, existingRequiredParameters, target, propertyKey)
}

/**
 * 校验类方法的必填参数。
 * @param target Class
 * @param propertyName class method
 * @param descriptor class method's descriptor: PropertyDescriptor
 */
function validate(target: any, propertyName: string, descriptor: PropertyDescriptor){
    let method = descriptor.value as Function;
    descriptor.value = function(){
        let requiredParamters: number[] = Reflect.getOwnMetadata(requiredMetaDataKey, target, propertyName)
        if(requiredParamters){
            for(let parameterIndex of requiredParamters){
                if(parameterIndex >= arguments.length || arguments[parameterIndex] === undefined){
                    throw new Error('Missing required argument.');
                }
            }
        }
        return method.apply(this, arguments)
    }
}
class Greeter{
    greeting: string;
    
    constructor(message: string){
        this.greeting = message;
    }

    @validate
    greet(@required name: string){
        return "Hello " + name + ', ' + this.greeting;
    }
}

let greet = new Greeter('welcome')
// greet.greet() // 报错，缺少参数
