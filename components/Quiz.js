import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";

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
      showAnswer: false
    };
  }

  showAnswer = () => {
    this.setState({ showAnswer: true });
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
    const { currentCard } = this.state;
    const card = cardsForDeck[currentCard];

    return (
      <View>
        <Text>
          {currentCard + 1} / {numCards}
        </Text>
        {this.renderQuestionOrAnswer(card)}
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
