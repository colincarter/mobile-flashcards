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

import DeckStorage from "./lib/storage";
import configureStore from "./store/configureStore";
import defaultState from "./store/defaultState";
import { addDeck, addCard } from "./actions";

import "./ReactotronConfig";

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
  },
  Quiz: {
    screen: Quiz
  }
});

const store = configureStore(defaultState);

const ds = new DeckStorage();

ds.getDecks().then(decks => {
  console.log({ decks });

  for (const deck in decks) {
    store.dispatch(addDeck(deck.title));
    for (const question in deck.questions) {
      store.dispatch(addCard(card, question));
    }
  }
});

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
