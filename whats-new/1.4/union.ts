interface RunOptions{
    program: string;
    commandlines: string[]|string|(() => string);
}

var opts: RunOptions = { program: 'hello', commandlines: ''} /* ... */
opts.commandlines = '-hello world'; // ok
opts.commandlines = ['-hello', 'world']
// opts.commandlines = [42] // error

// if(opts.length){}