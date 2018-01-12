export default () => {}

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name{
	// (parameter) n: string | (() => string)
	if(typeof n === 'string'){
		// (parameter) n: string
		return n;
	}

	// (parameter) n: () => string
	return n();
}