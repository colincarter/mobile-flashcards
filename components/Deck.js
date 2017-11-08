import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
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

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={this.onPress}
        pointerEvents="auto"
      >
        <Text style={styles.cardName}>{this.props.name}</Text>
        <Text style={styles.numCard}>
          {numCards} {numCards == 1 ? "Card" : "Cards"}
        </Text>
      </TouchableOpacity>
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
