import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Constants, Notifications, Permissions } from "expo";

import configureStore from "./store/configureStore";
import defaultState from "./store/defaultState";
import loadDecks from "./lib/loadDecks";
import MainNavigation from "./routes";

const store = configureStore(defaultState);
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
