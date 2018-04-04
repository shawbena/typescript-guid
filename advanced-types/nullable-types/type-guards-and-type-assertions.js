"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function f(sn) {
    return sn || 'default';
}
// function broken(name: string | null): string{
// 	function postfix(epithet: string){
// 		return name.charAt(0) + ' . the ' + epithet; // error, 'name' is possibly null
// 	}
// 	name = name || 'Bob';
// 	return postfix('great');
// }
function fixed(name) {
    function postfix(epithet) {
        return name.charAt(0) + '. the' + epithet;
    }
    name = name || 'Bob';
    return postfix('great');
}
