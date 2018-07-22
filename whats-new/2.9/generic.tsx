
declare function styledComponent<Props>(str: TemplateStringsArray): React.Component<Props>;

interface MyProps{
    name: string
    age: number;
}

styledComponent<MyProps>`
    font-size: 1.5rem;
    text-align: center;
    color: palevioletred;
`

declare function tag<T>(str: TemplateStringsArray, ...args: T[]): T;

let a = tag<string | number> `${100} ${"hello"}`;