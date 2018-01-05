export default () => {}

interface UIElement {
	addClickListener(onClick: (this: void, e: Event) => void): void;
}

class Handler {
	info: string;
	onClickBad = (e: Event) =>{
		this.info = '';
	}
}

let h = new Handler();
let uiElement: UIElement = {
	addClickListener: function(e){
		this.hh = '';
	}
};

uiElement.addClickListener(h.onClickBad);