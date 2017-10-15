import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Deck extends React.Component {
  render = () => {
    return (
      <View>
        <Text>{this.props.name}</Text>
        <Text>{(this.props.cards[this.props.name] || []).length} Cards</Text>
      </View>
    );
  };
}

Deck.propTypes = {
  name: PropTypes.string.isRequired
};

const mapStateToProps = ({ cards }) => ({
  cards
});
export default connect(mapStateToProps)(Deck);
