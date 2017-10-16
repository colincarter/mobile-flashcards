import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Deck extends React.Component {
  onClick = () => {
    console.log("click");
    this.props.navigate(this.props.name);
  };

  render = () => {
    return (
      <View style={styles.card} onClick={this.onClick}>
        <Text style={styles.cardName}>{this.props.name}</Text>
        <Text>{(this.props.cards[this.props.name] || []).length} Cards</Text>
      </View>
    );
  };
}

Deck.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 10
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
