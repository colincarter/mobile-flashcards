import { AsyncStorage } from "react-native";

export default class DecksStorage {
  key = "decks";

  getDecks() {}
  getDeck(id) {}

  saveDeckTitle(title) {
    const deck = { [title]: { title, questions: [] } };
    let decks = this.getItem();
    console.log(decks);
    const newDecks = { ...decks, deck };
    this.setItem(newDecks);
  }

  addCardToDeck(title, card) {
    const decks = this.saveDeckTitle(title);
    const newDecks = { ...decks };
    const questions = newDecks[title].questions;
    newDecks[title].questions = [...questions, card];
    this.set(newDecks);
  }

  async getItem() {
    let data = await AsyncStorage.getItem(this.key);
    if (data === undefined) {
      data = "{}";
    }
    return JSON.parse(data);
  }

  async setItem(data) {
    const origData = this.get();
    const newData = { ...origData, data };
    return await AsyncStorage.setItem(this.key, JSON.stringify(newData));
  }
}
