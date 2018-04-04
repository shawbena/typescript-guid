export default function assertNever(x: any): never{
	throw new Error('Unexpected object: ' + x);
}