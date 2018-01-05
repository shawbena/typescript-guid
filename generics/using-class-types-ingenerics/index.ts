class BeeKeeper{
	hasMask: boolean;
}

class ZooKeeper{
	nametag: string;
}

class Animal{
	numLegs: number;
}

class Bee extends Animal{
	keeper: BeeKeeper;
}

class Lion extends Animal{
	keeper: ZooKeeper;
}

function createInstnace<A extends Animal>(c: new () => A): A{
	return new c();
}

createInstnace(Lion).keeper.nametag;
createInstnace(Bee).keeper.hasMask;
// createInstnace(BeeKeeper);