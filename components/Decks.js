import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";

class Decks extends React.Component {
  render() {
    return (
      <View>
        <Text>All Decks</Text>
        {this.props.decks.map((deck, i) => <Deck name={deck} key={i} />)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(Decks);
