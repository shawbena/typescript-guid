"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var desk = {
    suits: ['hearts', 'spades', 'clubs', 'diamounds'],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // Note: the line below is now an arrow function, allowing us to capture 'this' right here
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
// let createCardPicker = desk.createCardPicker;
// (method) Deck.createCardPicker(this: Deck): () => Card
var cardPicker = desk.createCardPicker();
//[ts] 类型为“void”的 "this" 上下文不能分配给类型为“Deck”的方法的 "this"。
// let cardPicker = createCardPicker();
var pickedCard = cardPicker();
console.log('card: ' + pickedCard + ' of ' + pickedCard.suit);
