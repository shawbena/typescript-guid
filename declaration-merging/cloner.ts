declare class Animal{}
declare class Sheep{}
declare class Dog{}
declare class Cat{}

interface Cloner{
    clone(animal: Animal): Animal;
}

interface Cloner{
    clone(animal: Sheep): Sheep
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

class Test implements Cloner{
    clone(animal: Animal): Animal;    clone(animal: Sheep): Sheep;
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: any) {
        // throw new Error("Method not implemented."); 
        return new Animal()
    }

}
// new Test().clone() // 有4个重载