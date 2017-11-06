import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";

import AddDeck from "./components/AddDeck";
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

import { DecksStorage } from "./lib/storage";
import configureStore from "./store/configureStore";
import defaultState from "./store/defaultState";

const Tabs = TabNavigator({
  Decks: {
    screen: Decks
  },
  AddDeck: {
    screen: AddDeck
  }
});

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});

const store = configureStore(defaultState);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
