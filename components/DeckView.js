import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";

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

  addCard = () => {
    this.props.navigation.navigate("AddCard", {
      deckName: this.props.navigation.state.params.deckName
    });
  };

  startQuiz = () => {};

  render = () => {
    const { deckName } = this.props.navigation.state.params;
    const { cards } = this.props;
    const numCards = (cards[deckName] || []).length;

    return (
      <View>
        <Text>{deckName}</Text>
        <Text>{numCards} cards</Text>
        <Button title="Add Card" onPress={this.addCard} />
        <Button title="Start Quiz" onPress={this.startQuiz} />
      </View>
    );
  };
}

const mapStateToProps = ({ cards }) => {
  return {
    cards
  };
};

export default connect(mapStateToProps)(DeckView);
