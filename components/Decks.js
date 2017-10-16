import React from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";

class Decks extends React.Component {
  renderDeck = ({ item }) => {
    return <Deck name={item} />;
  };

  render() {
    return (
      <View>
        <FlatList data={this.props.decks} renderItem={this.renderDeck} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(Decks);
