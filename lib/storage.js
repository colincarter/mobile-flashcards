import { AsyncStorage } from "react-native";

export default class DecksStorage {
  key = "decks";

  getDecks() {}
  getDeck(id) {}

  saveDeckTitle(title) {
    this.get().then(decks => {
      const deck = { [title]: { title, questions: [] } };
      const newDecks = { ...decks, deck };
      this.set(newDecks);
    });
  }

  addCardToDeck(title, card) {
    const decks = this.saveDeckTitle(title);
    const questions = decks[title].questions;
    decks[title].questions = [...questions, card];
    this.set(decks);
  }

  get() {
    return AsyncStorage.getItem(this.key)
      .then(data => data || {})
      .then(data => JSON.parse(data));
  }

  set(data) {
    const origData = this.get();
    const newData = [...origData, data];
    AsyncStorage.setItem(this.key, JSON.stringify(newData));
  }
}
