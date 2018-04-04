export interface LabelledValue {
	label: string;
}

export function printLabel(labelledObj: LabelledValue){
	console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);