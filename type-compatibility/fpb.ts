export default () => {}

enum EventType {
    Mouse, Keyboard
}

interface Event {
    timestamp: number;
}

interface MouseEvent extends Event {
    x: number;
    y: number;
}

interface KeyEvent extends Event{
    keyCode: number;
}

interface listenEventCallback{
    (e: MouseEvent): void;
}

function listenEvent(eventType: EventType, handler: (e: Event) => void): void{
    //...
}

// Unsound, but useful and common
// listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ', ' + e.y));

//
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' +(<MouseEvent>e).y));

/*
类型“(e: number) => void”的参数不能赋给类型“(e: Event) => void”的参数。
  参数“e”和“e” 的类型不兼容。
    不能将类型“Event”分配给类型“number”。
*/
// listenEvent(EventType.Mouse, (e: number) => console.log(e));

let e: Event = { timestamp: new Date().valueOf() };

let m: MouseEvent = { 
    timestamp: new Date().valueOf(),
    x: 100,
    y: 50
 };

let e2: Event = m;

/*
  不能将类型“Event”分配给类型“MouseEvent”。
  类型“Event”中缺少属性“x”。
*/
// let m2: MouseEvent = e;