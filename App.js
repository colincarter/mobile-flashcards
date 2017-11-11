import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Constants, Notifications, Permissions } from "expo";

import AddDeck from "./components/AddDeck";
import Decks from "./components/Decks";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

import DeckStorage from "./lib/storage";
import configureStore from "./store/configureStore";
import defaultState from "./store/defaultState";
import { addDeck, addCard } from "./actions";

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

const loadDecks = async store => {
  const ds = new DeckStorage();
  const decks = await ds.getDecks();
  for (const deck in decks) {
    store.dispatch(addDeck(deck));
    decks[deck].questions.forEach(card => store.dispatch(addCard(deck, card)));
  }
};

loadDecks(store);

export default class App extends React.Component {
  async componentDidMount() {
    const notification = {
      title: "Mobile Flashcards",
      body: "Don't forget to take your quiz today"
    };

    const schedulingOptions = {
      time: new Date().getTime() + 1000,
      repeat: "day"
    };

    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === "granted") {
      await Notifications.scheduleLocalNotificationAsync(
        notification,
        schedulingOptions
      );
    }
  }

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
