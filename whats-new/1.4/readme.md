# Typescript 1.4

## Union types

联合类型是表示一个值既可以是几种类型之一的强有力方式。如你可能有一个 API 动行一个程序，接受既可以是 `string` 又可以是 `string[]` 或也可以是一个返回 `string` 的函数的命令行参数。你可以这样写：

```ts
interface RunOptions{
    program: string;
    commandlines: string[]|string|(() => string);
}
```

联合类型的赋值很直观，联合类型成员之一的类型都可以赋给联合体：

```ts
var opts: RunOptions = /* ... */;
opts.commandline = '-hello world'; // OK
opts.commandline = ['-hello', 'world']; // OK
opts.commandline = [42]; // Error, number is not string or string[]
```

当读取联合类型时，你可以看见他们共享的任何属性：

```ts
if (opts.length === 0) { // OK, string and string[] both have 'length' property
  console.log("it's empty");
}
```

使用类型守卫 (Type Guards)，处理联合类型的变量更轻松：

```ts
function formatCommand(c: string|string[]){
    if(typeof c === 'string'){
        return c.trim();
    }else{
        return c.join(' ');
    }
}
```