export default () => {}

let s = 'foo';
// s = null; // error, 'null' is not assgnable to 'string'
let sn: string | null = 'bar';
sn = null; // ok

// sn = undefined; // error, 'undefined' is not assignable to 'string | null'