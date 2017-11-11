import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { primary, secondary } from "../constants";

class Stats extends React.Component {
  static propTypes = {
    numCards: PropTypes.number.isRequired,
    correctCount: PropTypes.number.isRequired,
    incorrectCount: PropTypes.number.isRequired
  };

  restartQuiz = () => {
    this.props.navigation.navigate("Quiz", { deckName: this.props.deckName });
  };

  backToDeck = () => {
    this.props.navigation.navigate("DeckView", {
      deckName: this.props.deckName
    });
  };

  render = () => {
    return (
      <View>
        <Card title="Quiz Stats">
          <Text>
            Correct:{" "}
            {Math.round(this.props.correctCount / this.props.numCards * 100)}%
          </Text>
          <Text>
            Incorrect:{" "}
            {Math.round(this.props.incorrectCount / this.props.numCards * 100)}%
          </Text>
        </Card>
        <Text> </Text>
        <Button
          title="Restart Quiz"
          backgroundColor={primary}
          onPress={this.restartQuiz}
        />
        <Text> </Text>
        <Button
          title="Back to Deck"
          backgroundColor={secondary}
          onPress={this.backToDeck}
        />
      </View>
    );
  };
}

export default Stats;
