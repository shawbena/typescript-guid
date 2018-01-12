import { posix } from "path";

export default () => {}

function f(sn: string | null): string{
	return sn || 'default';
}

// function broken(name: string | null): string{
// 	function postfix(epithet: string){
// 		return name.charAt(0) + ' . the ' + epithet; // error, 'name' is possibly null
// 	}

// 	name = name || 'Bob';
// 	return postfix('great');
// }

function fixed(name: string | null): string{
	function postfix(epithet: string){
		return name!.charAt(0) + '. the' + epithet;
	}
	name = name || 'Bob';
	return postfix('great');
}