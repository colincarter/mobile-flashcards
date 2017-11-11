import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";

class DeckView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = props => {
    const { deckName } = props.navigation.state.params;
    return {
      title: deckName
    };
  };

  constructor(props) {
    super(props);
    this.deckName = this.props.navigation.state.params.deckName;
  }

  addCard = () => {
    this.props.navigation.navigate("AddCard", {
      deckName: this.deckName
    });
  };

  startQuiz = () => {
    this.props.navigation.navigate("Quiz", {
      deckName: this.deckName
    });
  };

  render = () => {
    const { cards } = this.props;
    const numCards = (cards[this.deckName] || []).length;

    return (
      <View>
        <Text style={styles.title}>{this.deckName}</Text>
        <Text style={[styles.title, { fontSize: 13 }]}>
          {numCards} {numCards == 1 ? "Card" : "Cards"}
        </Text>
        <Button title="Add Card" onPress={this.addCard} />
        <Button
          title="Start Quiz"
          onPress={this.startQuiz}
          disabled={numCards == 0}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});

const mapStateToProps = ({ cards }) => {
  return {
    cards
  };
};

export default connect(mapStateToProps)(DeckView);
