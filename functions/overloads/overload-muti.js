"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var suits = ['hearts', 'spades', 'clubs', 'diamonds'];
function pickCard(x) {
    if (typeof x == 'object') {
        var pickCard_1 = Math.floor(Math.random() * x.length);
    }
    else if (typeof x == 'number') {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{
        suit: 'diamonds',
        card: 2
    }, {
        suit: 'spades',
        card: 10
    }, {
        suit: 'hearts',
        card: 4
    }];
// let pickedCard1 = myDeck[pickCard(myDeck)];
// console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);
// let pickedCard2 = pickCard(15);
// console.log("card: " + pickedCard2.card + ' of ' + pickedCard2.suit); 
