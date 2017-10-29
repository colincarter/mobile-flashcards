import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";

import Stats from "./Stats";

class Quiz extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Quiz"
    };
  };

  constructor(props) {
    super(props);
    this.deckName = props.navigation.state.params.deckName;

    this.state = {
      currentCard: 0,
      showAnswer: false,
      correctCount: 0,
      incorrectCount: 0
    };
  }

  showAnswer = () => {
    this.setState({ showAnswer: true });
  };

  onPressCorrect = () => {
    this.setState(prevState => {
      return {
        correctCount: prevState.correctCount + 1,
        currentCard: prevState.currentCard + 1,
        showAnswer: false
      };
    });
  };

  onPressInCorrect = () => {
    this.setState(prevState => {
      return {
        incorrectCount: prevState.incorrectCount + 1,
        currentCard: prevState.currentCard + 1,
        showAnswer: false
      };
    });
  };

  renderQuestionOrAnswer = card => {
    if (this.state.showAnswer) {
      return <Text>{card.answer}</Text>;
    }

    return (
      <View>
        <Text>{card.question}</Text>
        <Button title="answer" onPress={this.showAnswer} />
      </View>
    );
  };

  render = () => {
    const { cardsForDeck, numCards } = this.props;
    const { currentCard, correctCount, incorrectCount } = this.state;
    const card = cardsForDeck[currentCard];

    if (currentCard >= numCards) {
      return (
        <Stats
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          numCards={numCards}
        />
      );
    }

    return (
      <View>
        <Text>
          {currentCard + 1} / {numCards}
        </Text>
        {this.renderQuestionOrAnswer(card)}
        <Button title="Correct" onPress={this.onPressCorrect} />
        <Button title="Incorrect" onPress={this.onPressInCorrect} />
      </View>
    );
  };
}

function mapStateToProps(state, props) {
  const { deckName } = props.navigation.state.params;
  const cards = state.cards[deckName];

  return {
    cardsForDeck: cards,
    numCards: cards.length
  };
}

export default connect(mapStateToProps)(Quiz);
