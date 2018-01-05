export default () => {}

function f(this: void){
	// make sure `this` is unusable in this standalone

	//[ts] 类型“void”上不存在属性“hh”。
	// this.hh;
}