export default () => {}

interface Card {
	suit: string;
	card: number;
}

let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: { suit: string; card: number; }[]): number;

/*
重载没有实现时这样提示
[ts] 函数实现缺失或未立即出现在声明之后。
function pickCard(x: number): {
    suit: string;
    card: number;
} (+1 overload)
*/
function pickCard(x: number): { suit: string; card: number; }



function pickCard(x: any):any {
	if(typeof x == 'object'){
		let pickCard = Math.floor(Math.random() * x.length);
	}else if(typeof x == 'number'){
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}
let myDeck = [{
	suit: 'diamonds', 
	card: 2 }, {
	suit: 'spades', 
	card: 10 }, {
	suit: 'hearts',
	card: 4,
}];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);
// pickCard()
let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + ' of ' + pickedCard2.suit);