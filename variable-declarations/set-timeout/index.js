var _loop_1 = function (i) {
    setTimeout(function () { console.log(i); }, i * 100);
};
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
