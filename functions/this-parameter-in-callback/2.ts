export default () => {}

interface UIElement {
	addClickListener(onClick: (this: void, e: Event) => void): void;
}

class Handler {
	info = '';
	onClickBad(this: void, e: Event){
		// this.info = e.message;
		// [ts] 类型“void”上不存在属性“info”。
		// this.info = '';
		console.log('clicked!');
	}
}

let h = new Handler();
let uiElement: UIElement = {
	addClickListener: function(e){

	}
};

uiElement.addClickListener(h.onClickBad);