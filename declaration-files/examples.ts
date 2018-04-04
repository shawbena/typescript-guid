export default () => { }

interface Example {
    diff(one: string, two?: string, three?: boolean): number;
}

interface Example{
    diff(one: string): number;
    diff(one: string, two: string): number;
    diff(one: string, two: string, three: boolean): number;
}

interface Diff{
    (): (a: string, b: string, c: boolean) => number;
}

// 使用接口以执行类型检查
function fn(x: Diff) {
    
    return 1;
}

var x: Example = {
    diff(a: string) {
        return Number(a);
    }
};

// fn(x.diff);