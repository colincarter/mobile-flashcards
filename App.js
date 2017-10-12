import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import AddDeck from "./components/AddDeck";

const Decks = () => (
  <View>
    <Text>All Decks</Text>
  </View>
);

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
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
