import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Deck extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    cards: PropTypes.object.isRequired,
    onPressItem: PropTypes.func.isRequired
  };

  onPress = () => {
    this.props.onPressItem(this.props.name);
  };

  render = () => {
    const cards = this.props.cards[this.props.name] || [];
    const numCards = cards.length;
    const subtitle = numCards === 1 ? "Card" : "Cards";

    return (
      <ListItem title={this.props.name} subtitle={`${numCards} ${subtitle}`} />
    );
  };
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3"
  },
  cardName: {
    fontSize: 19,
    marginLeft: 10,
    marginRight: 10
  },
  numCard: {
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10
  }
});

const mapStateToProps = ({ cards }) => ({
  cards
});
export default connect(mapStateToProps)(Deck);
