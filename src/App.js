import React, { Component } from "react";
import "./App.css";
import shuffle from "shuffle-array";
import Box from "./Box";
import Navbar from "./Navbar";

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2,
};

const cards = [
  { id: 0, cardState: CardState.HIDING, backgroundColor: "blue" },
  { id: 1, cardState: CardState.HIDING, backgroundColor: "blue" },
  { id: 2, cardState: CardState.HIDING, backgroundColor: "red" },
  { id: 3, cardState: CardState.HIDING, backgroundColor: "red" },
  { id: 4, cardState: CardState.HIDING, backgroundColor: "green" },
  { id: 5, cardState: CardState.HIDING, backgroundColor: "green" },
  { id: 6, cardState: CardState.HIDING, backgroundColor: "pink" },
  { id: 7, cardState: CardState.HIDING, backgroundColor: "pink" },
  { id: 8, cardState: CardState.HIDING, backgroundColor: "orange" },
  { id: 9, cardState: CardState.HIDING, backgroundColor: "orange" },
];

class App extends Component {
  state = { cards: shuffle(cards) };

  onCardClick = (cardID) => {
    const handleCardsState = function (cards, ids, newState) {
      return cards.map((c) => {
        if (ids.includes(c.id)) {
          return {
            ...c,
            cardState: newState,
          };
        }
        return c;
      });
    };

    const foundCard = this.state.cards.find((c) => c.id === cardID);

    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    let noClick = false;

    let cards = handleCardsState(this.state.cards, [cardID], CardState.SHOWING);

    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING);
    const ids = showingCards.map((c) => c.id);

    if (
      showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor
    ) {
      cards = handleCardsState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = handleCardsState(cards, ids, CardState.HIDING);
      noClick = true;
      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          this.setState({ cards: hidingCards, noClick: false });
        }, 1500);
      });
      return;
    }
    this.setState({ cards, noClick });
  };

  handleGameReset = () => {
    let cards = this.state.cards.map((c) => ({
      ...c,
      cardState: CardState.HIDING,
    }));
    cards = shuffle(cards);
    this.setState({ cards });
  };

  render() {
    return [
      <Navbar onGameReset={this.handleGameReset} />,

      <div className="container">
        {this.state.cards.map((c) => (
          <Box
            card={c}
            showing={c.cardState !== CardState.HIDING}
            key={c.id}
            onClick={() => this.onCardClick(c.id)}
          />
        ))}
      </div>,
    ];
  }
}

export default App;
