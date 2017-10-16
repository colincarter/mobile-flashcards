import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

class DeckList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = props => {
    const { deckName } = props.navigation.state.params;
    return {
      title: deckName
    };
  };

  render = () => {
    const { deckName } = this.props.navigation.state.params;
    return (
      <View>
        <Text>DeckList</Text>
        <Text>{deckName}</Text>
      </View>
    );
  };
}

export default DeckList;
