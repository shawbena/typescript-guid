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
var cardPicker = desk.createCardPicker();
var pickedCard = cardPicker();
alert('card: ' + pickedCard + ' of ' + pickedCard.suit);
