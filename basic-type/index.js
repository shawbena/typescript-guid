(function () {
    var decimal = 6;
    var hex = 0xf00d;
    var binary = 10;
    var octal = 484;
})();
(function () {
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    var c = Color.Green;
})();
(function () {
    var notSure = 4;
    notSure = 'may be a string instead';
    notSure = false;
    var prettySure = {
        name: 'sfka'
    };
    // prettySure.toFixed(); //error
    // prettySure.name;  //Property 'name' does not exist on type 'Object'
    var list = [1, true, 'free'];
    list[1] = 100;
    list[2] = 200;
    var n = list[1];
})();
(function () {
    function warnUser() {
        alert('my warning message');
    }
    var unusable = undefined;
    // unusable = null;
    // unusable = 5;//Type '5' is not assignable to type 'void'
})();
