import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  Platform,
  StyleSheet
} from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import DeckStorage from "../lib/storage";
import { Ionicons } from "@expo/vector-icons";
import { primary } from "../constants";
import { NavigationActions } from "react-navigation";

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
    deckName: ""
  };

  onChangeText = deckName => {
    this.setState({ deckName });
  };

  onButtonPress = () => {
    const deckName = this.state.deckName;

    this.props.addDeck(deckName);
    new DeckStorage().saveDeckTitle(deckName);
    this.setState({ deckName: "" });
    this._textInput.clearText();

    const navigationAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: "Home"
        }),
        NavigationActions.navigate({
          routeName: "DeckView",
          params: { deckName: deckName }
        })
      ]
    });
    this.props.navigation.dispatch(navigationAction);
  };

  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new Deck?</Text>
        <View>
          <FormLabel>Deck Title</FormLabel>
          <FormInput
            placeholder="The title of your new deck"
            onChangeText={this.onChangeText}
            ref={component => (this._textInput = component)}
          />
        </View>
        <Button
          raised
          onPress={this.onButtonPress}
          title="Add Deck"
          disabled={this.state.deckName === ""}
          backgroundColor={primary}
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
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(AddDeck);
