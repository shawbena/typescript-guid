const enum Suit { Clubs, Diamonds, Hearts, Spades }

var d = Suit.Diamonds;
enum MyFlags {
    None = 0,
    Neat = 1,
    Cool = 2,
    Awesome = 4,
    Best = Neat | Cool | Awesome
  }
  // var b = MyFlags.; // emits var b = 7;
  