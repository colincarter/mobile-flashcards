import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const Deck = ({ name }) => (
  <View>
    <Text>{name}</Text>
  </View>
);

Deck.propTypes = {
  name: PropTypes.string.isRequired
};

export default Deck;
