export default () => {}

let desk: Idesk = {
    suits: ['he`arts', 'spades', 'clubs', 'diamounds'],
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

interface IcreateCardPicker {
    (): () => {suit: any; card: number}
}
interface Idesk {
    suits: Array<string>;
    cards: Array<any>;
    createCardPicker: IcreateCardPicker

}

let createCardPicker = desk.createCardPicker;
 
let cardPicker = createCardPicker();
let pickedCard = cardPicker();
console.log('card: ' + pickedCard + ' of ' + pickedCard.suit);

//如果 desk.createCardPicker 只用于 desk 那么他应绑定至 desk
/*
$ node dist/functions/this/2.js
/Users/shaw/Documents/typescript-guid/dist/functions/this/2.js:13
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
                                ^

TypeError: Cannot read property 'suits' of undefined
    at /Users/shaw/Documents/typescript-guid/dist/functions/this/2.js:13:33
    at Object.<anonymous> (/Users/shaw/Documents/typescript-guid/dist/functions/this/2.js:19:18)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:390:7)
    at startup (bootstrap_node.js:150:9)
*/