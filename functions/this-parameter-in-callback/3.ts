export default () => {}

interface UIElement {
	addClickListener(onClick: (this: void, e: Event) => void): void;
}

class Handler {
	// [ts] 属性“info”没有初始化表达式，且未在构造函数中明确赋值。
	// info: string;
	onClickBad = (e: Event) =>{
		// this.info = '';
	}
}

let h = new Handler();
let uiElement: UIElement = {
	addClickListener: function(e){
		// this.hh = '';
	}
};

uiElement.addClickListener(h.onClickBad);