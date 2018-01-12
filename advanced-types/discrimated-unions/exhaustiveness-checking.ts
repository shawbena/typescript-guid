export default () => {}

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

//[ts] 函数缺少结束返回语句，返回类型不包括 "undefined"。
// function area(s: Shape): number{
// 	switch(s.kind){
// 		case 'square': return s.size * s.size;
// 		case 'rectangle': return s.height * s.width;
// 		case 'circle': return Math.PI * s.radius * 2;
// 	}
// }