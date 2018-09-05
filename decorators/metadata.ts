import 'reflect-metadata'

class Point{
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

class Line{
    private _p0: Point;
    private _p1: Point;

    @validate
    set p0(value: Point){ this._p0 = value }
    get p0(){ return this._p0 }

    @validate
    set p1(value: Point){ this._p1 = value }
    get p1(){ return this._p1 }

    constructor(p0: Point, p1: Point){
        this._p0 = p0;
        this._p1 = p1;
    }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>){
    let set = descriptor.set as {(value: T): void}
    if(!set){
        return;
    }
    descriptor.set = function(value: T){
        let type = Reflect.getMetadata("design:type", target, propertyKey)
        if(!(value instanceof type)){
            throw new TypeError('Invalidid type.')
        }
        set(value);
    }
}
// in `metadata.js`
// let line = new Line(new Point(0, 0), new Point(1, 1));
// console.log(line);
// line.p0 = 1; //运行时报错
// line.p1 = 2;