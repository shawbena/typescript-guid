export default () => {};

enum Status {
    Ready,
    Waiting
}

enum Color {
    Red, Blue, Green
}

let status = Status.Ready;

//[ts] 不能将类型“Color.Red”分配给类型“Status”。
// status = Color.Red;

let n: number = status;