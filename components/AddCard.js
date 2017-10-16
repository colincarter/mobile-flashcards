import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

class AddCard extends React.Component {
  static navigationOptions = props => {
    return {
      title: "Add Card"
    };
  };

  render = () => {
    const { deckName } = this.props.navigation.state.params;
    console.log(deckName);
    return (
      <View>
        <Text>Add Card</Text>
        <Text>{deckName}</Text>
      </View>
    );
  };
}

export default AddCard;
