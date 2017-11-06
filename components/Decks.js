import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";

class Decks extends React.Component {
  static propTypes = {
    decks: PropTypes.arrayOf(Object).isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    tabBarLabel: "Decks"
  };

  static onPressItem = item => {
    this.props.navigation.navigate("DeckView", { deckName: item });
  };

  renderDeck = ({ item }) => {
    return <Deck name={item} onPressItem={this.onPressItem} />;
  };

  keyExtractor = (item, index) => index;

  render = () => {
    return (
      <View>
        <FlatList
          data={this.props.decks}
          renderItem={this.renderDeck}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  };
}

const mapStateToProps = ({ decks }) => ({
  decks
});

export default connect(mapStateToProps)(Decks);
