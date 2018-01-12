interface Bird{
	fly():void;
	layEggs():void;
}

interface Fish{
	swim():void;
	layEggs():void;
}

function getSmallPet(): Fish | Bird {
	//...
	return {fly: () => {}, layEggs: () => {}};
}

let pet = getSmallPet();
pet.layEggs(); //okay
/*
[ts]
类型“Bird | Fish”上不存在属性“swim”。
  类型“Bird”上不存在属性“swim”。
*/
// pet.swim(); // errors