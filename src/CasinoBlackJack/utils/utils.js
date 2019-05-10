//Generate deck
export const getDeck = () => {
  const suits = ["spades", "diamonds", "clubs", "hearts"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      const card = { value: values[x], suit: suits[i], isOpen: true };
      deck.push(card);
    }
  }
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
  return deck;
};

//returns hand and deck after drawing
export const draw = (player, deck, isOpen) => {
  const card = deck.pop();
  if (!isOpen) {
    card.isOpen = false;
  }
  player.push(card);
  return player, deck;
};

//to render icon
export const icon = suit => {
  if (suit == "hearts") return String.fromCharCode(9829);
  else if (suit == "spades") return String.fromCharCode(9824);
  else if (suit == "diamonds") return String.fromCharCode(9830);
  else return String.fromCharCode(9827);
};

//returns hand value
export const checkScore = hand => {
  let points = 0;
  let isSoft = false;

  //calculate points for non-Ace cards first
  hand.forEach(card => {
    let cardValue = 0;
    if (card.value !== "A") {
      if (card.value == "J" || card.value == "Q" || card.value == "K") {
        cardValue = 10;
      } else {
        cardValue = Number(card.value);
      }
    }
    points += cardValue;
  });
  //then for Aces
  hand.forEach(card => {
    if (card.value === "A") {
      if (points > 10) {
        points += 1;
      } else {
        isSoft = true;
        points += 11;
      }
    }
  });

  if (points === 21 && hand.length === 2) {
    return "BLACKJACK";
  }
  if (points > 21) {
    return "BURST";
  }

  return isSoft ? "soft " + points : points;
};
//returns result in string
export const checkResult = (playerScore, dealerScore) => {
  if (playerScore[0] === "s") {
    playerScore = Number(playerScore.slice(-2));
  }
  if (dealerScore[0] === "s") {
    dealerScore = Number(dealerScore.slice(-2));
  }
  if (playerScore === "BLACKJACK") {
    return dealerScore === "BLACKJACK" ? "TIE" : "BLACKJACK";
  } else if (playerScore === "BURST" || playerScore < dealerScore) {
    return "LOSE";
  } else if (playerScore === dealerScore) {
    return "TIE";
  } else if (dealerScore === "BURST" || playerScore > dealerScore) {
    return "WIN";
  } else {
    console.log("checkResult error");
    console.log(playerScore);
    console.log(dealerScore);
  }
};
