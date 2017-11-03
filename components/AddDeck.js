import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, AsyncStorage, Button } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import DeckStorage from "../lib/storage";

class AddDeck extends React.Component {
  static propTypes = {
    addDeck: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  state = {
    text: ""
  };

  onChangeText = text => {
    this.setState({ text });
  };

  onButtonPress = () => {
    this.props.addDeck(this.state.text);
    new DeckStorage().saveDeckTitle(this.state.text);
    this.setState({ text: "" });
    this._textInput.setNativeProps({ text: "" });
    this.props.navigation.goBack(null);
  };

  render = () => {
    return (
      <View>
        <Text>What is the title of your new Deck?</Text>
        <TextInput
          placeholder="Deck title"
          onChangeText={this.onChangeText}
          ref={component => (this._textInput = component)}
        />
        <Button
          onPress={this.onButtonPress}
          title="Add Deck"
          disabled={this.state.text === ""}
        />
      </View>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(AddDeck);
