function getSmallPet() {
    //...
    return { fly: function () { }, layEggs: function () { } };
}
var pet = getSmallPet();
pet.layEggs(); //okay
/*
[ts]
类型“Bird | Fish”上不存在属性“swim”。
  类型“Bird”上不存在属性“swim”。
*/
// pet.swim(); // errors 
