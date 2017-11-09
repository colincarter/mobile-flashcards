import React from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";

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

  onPressItem = item => {
    this.props.navigation.navigate("DeckView", { deckName: item });
  };

  renderDeck = ({ item }) => {
    return <Deck name={item} onPressItem={this.onPressItem} />;
  };

  keyExtractor = (item, index) => index;

  render = () => {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.props.decks}
          renderItem={this.renderDeck}
          keyExtractor={this.keyExtractor}
        />
      </List>
    );
  };
}

const mapStateToProps = ({ decks }) => ({
  decks
});

export default connect(mapStateToProps)(Decks);
