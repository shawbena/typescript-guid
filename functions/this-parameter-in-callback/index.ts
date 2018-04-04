export default () => {}

interface UIElement {
	addClickListener(onClick: (this: void, e: Event) => void): void;
}

class Handler {
	info = '';
	onClickBad(this: Handler, e: Event){
		// this.info = e.message;
		this.info = '';
	}
}

let h = new Handler();
let uiElement: UIElement = {
	addClickListener: function(e){

	}
};

/*
类型“(this: Handler, e: Event) => void”的参数不能赋给类型“(this: void, e: Event) => void”的参数。
  每个签名的 "this" 类型不兼容。
    不能将类型“void”分配给类型“Handler”
*/
// uiElement.addClickListener(h.onClickBad);