import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  Button,
  Platform,
  StyleSheet
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { DeckStorage } from "../lib/storage";
import { Ionicons } from "@expo/vector-icons";

class AddDeck extends React.Component {
  static propTypes = {
    addDeck: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    tabBarLabel: "Add Deck",
    tabBarIcon: () => (
      <Ionicons
        name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
      />
    )
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
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new Deck?</Text>
        <View style={styles.deckNameContainer}>
          <TextInput
            placeholder="Deck title"
            onChangeText={this.onChangeText}
            ref={component => (this._textInput = component)}
            style={styles.deckName}
          />
        </View>
        <Button
          onPress={this.onButtonPress}
          title="Add Deck"
          disabled={this.state.text === ""}
          style={styles.button}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  deckName: {
    marginTop: 20,
    textAlign: "left",
    height: 20,
    marginBottom: 20
  },
  deckNameContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {}
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(AddDeck);
