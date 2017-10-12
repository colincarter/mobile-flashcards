import React from "react";
import { View, Text, TextInput, AsyncStorage, Button } from "react-native";

export default class AddDeck extends React.Component {
  deckKey = "decks";

  state = {
    text: ""
  };

  onChangeText = ({ text }) => {
    this.setState({ text });
  };

  onButtonPress = async () => {
    let decks = await AsyncStorage.getItem(this.deckKey);
    if (decks === null) {
      decks = [];
    } else {
      decks = JSON.parse(decks);
    }
    const newDecks = [...decks, this.state.text];
    await AsyncStorage.setItem(JSON.stringify(this.deckKey, newDecks));
  };

  render() {
    return (
      <View>
        <Text>Add Deck</Text>
        <TextInput placeholder="Deck name" onChangeText={this.onChangeText} />
        <Button onPress={this.onButtonPress} title="Add Deck" />
      </View>
    );
  }
}
