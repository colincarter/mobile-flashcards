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
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={this.onPress}
        pointerEvents="auto"
      >
        <Text style={styles.cardName}>{this.props.name}</Text>
        <Text>{(this.props.cards[this.props.name] || []).length} Cards</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 50
  },
  cardName: {
    fontSize: 19,
    fontWeight: "bold",
    alignItems: "center"
  }
});

const mapStateToProps = ({ cards }) => ({
  cards
});
export default connect(mapStateToProps)(Deck);
