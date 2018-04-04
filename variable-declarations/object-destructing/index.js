var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var o = {
    a: 'foo',
    b: 12,
    c: 'bar',
    d: 1,
    e: [1, 2, 3]
};
// let { a, b } = o;
// let {a, b}: {a: string, b: number} = o;
// ({ c, d } = { c: 'baz', d: 101 }); // 识别不了
var c = o.c, passthrough = __rest(o, ["c"]);
var total = passthrough.d + passthrough.e.length;
var newName1 = o.a, newName2 = o.b;
