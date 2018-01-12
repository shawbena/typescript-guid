import assertNever from '../../utils/assert-never';

interface Square{
	kind: 'square';
	size: number;
}

interface Rectangle {
	kind: 'rectangle';
	width: number;
	height: number;
}

interface Circle {
	kind: 'circle';
	radius: number;
}

interface Triangle{
	kind: 'triangle';
	sideA: number;
	sideB: number;
}

type Shape = Square | Rectangle | Circle | Triangle;

function area(s: Shape): number{
	switch(s.kind){
		case 'square': return s.size * s.size;
		case 'rectangle': return s.height * s.width;
		case 'circle': return Math.PI * s.radius * 2;
		case 'triangle': return s.sideA * s.sideB / 2;
		// recommended
		default: return assertNever(s);
	}
}
