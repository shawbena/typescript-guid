(function(){
    let decimal = 6;
    let hex = 0xf00d;
    let binary = 0b1010;
    let octal = 0o744;
})();
(function(){
    enum Color { Red, Green, Blue}
    let c = Color.Green;
})();

(function(){
    let notSure: any = 4;
    notSure = 'may be a string instead';
    notSure = false;
    
    let prettySure: Object = {
        name: 'sfka'
    };
    // prettySure.toFixed(); //error
    // prettySure.name;  //Property 'name' does not exist on type 'Object'

    let list: any[] = [1, true, 'free'];
    list[1] = 100;
    list[2] = 200;
    let n = list[1];
})();

(function(){
    function warnUser(){
        alert('my warning message');
    }
    let unusable: void = undefined;
    // unusable = null;
    // unusable = 5;//Type '5' is not assignable to type 'void'
})();