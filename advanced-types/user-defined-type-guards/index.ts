export default () => {}

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

function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}

let pet = getSmallPet();
if(isFish(pet)){
	pet.swim();
}else{
	pet.fly();
}