import { AsyncStorage } from "react-native";

export default class DecksStorage {
  key = "decks";

  getDecks() {}
  getDeck(id) {}

  async saveDeckTitle(title) {
    const deck = { [title]: { title, questions: [] } };

    let data = await AsyncStorage.getItem(this.key);
    if (!data) {
      data = "{}";
    }

    const decks = JSON.parse(data);
    const newDecks = { ...decks, ...deck };

    await AsyncStorage.setItem(this.key, JSON.stringify(newDecks));

    return newDecks;
  }

  async addCardToDeck(title, card) {
    const decks = this.saveDeckTitle(title);
    const newDecks = { ...decks };
    const questions = newDecks[title].questions;
    newDecks[title].questions = [...questions, card];

    await AsyncStorage.setItem(this.key, JSON.stringify(newDecks));

    return newDecks;
  }
}
