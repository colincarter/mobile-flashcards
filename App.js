import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";

import AddDeck from "./components/AddDeck";
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";

import { DecksStorage } from "./lib/storage";
import configureStore from "./store/configureStore";
import defaultState from "./store/defaultState";

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks"
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck"
    }
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
