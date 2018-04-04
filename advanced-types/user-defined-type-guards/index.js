"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function getSmallPet() {
    //...
    return { fly: function () { }, layEggs: function () { } };
}
function isFish(pet) {
    return pet.swim !== undefined;
}
var pet = getSmallPet();
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
