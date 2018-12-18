interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
    // height: string // 后续属性声明必须属于同一类型。属性“height”的类型必须为“number”，但此处却为类型“string”。
}

let box: Box = {height: 5, width: 10, scale: 1.5}