import { AsyncStorage } from "react-native";

export default class DeckStorage {
  key = "decks";

  async getDecks() {
    let data = await AsyncStorage.getItem(this.key);
    if (!data) {
      data = "{}";
    }

    return JSON.parse(data);
  }

  getDeck(id) {
    const decks = this.getDecks();
    return decks[id];
  }

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
    let data = await AsyncStorage.getItem(this.decks);
    if (!data) {
      data = "{}";
    }
    const decks = JSON.parse(data);
    if (!decks[title]) {
      throw new Error(`${title} does not exist`);
    }
    const questions = decks[title].questions;
    decks[title].questions = [...questions, card];

    await AsyncStorage.setItem(this.key, JSON.stringify(decks));

    return decks;
  }
}
