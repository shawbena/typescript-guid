export default () => {}

interface Card {
	suit: string;
	card: number;
}

interface Deck {
	suits: string[];
	cards: number[];
	// this 在这里指的是参数吗
	createCardPicker(this: Deck): () => Card;
}

let desk: Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamounds'],
    cards: Array(52),
    createCardPicker: function() {
        // Note: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
};

// let createCardPicker = desk.createCardPicker;

// (method) Deck.createCardPicker(this: Deck): () => Card
let cardPicker = desk.createCardPicker();

//[ts] 类型为“void”的 "this" 上下文不能分配给类型为“Deck”的方法的 "this"。
// let cardPicker = createCardPicker();
let pickedCard = cardPicker();
console.log('card: ' + pickedCard + ' of ' + pickedCard.suit);