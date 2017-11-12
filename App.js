import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

import configureStore from "./store/configureStore";
import defaultState from "./store/defaultState";
import loadDecks from "./lib/loadDecks";
import setupNotifications from "./lib/setupNotifications";
import MainNavigation from "./routes";

const store = configureStore(defaultState);
loadDecks(store);

export default class App extends React.Component {
  componentDidMount() {
    setupNotifications();
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
