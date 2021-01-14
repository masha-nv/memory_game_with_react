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

  onCardStateChange = (cardID) => {
    let cards = this.state.cards.map((c) => {
      if (c.id === cardID) {
        return { ...c, cardState: CardState.SHOWING };
      } else return c;
    });
    this.setState({ cards });
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
            onClick={() => this.onCardStateChange(c.id)}
          />
        ))}
      </div>,
    ];
  }
}

export default App;
