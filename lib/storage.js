import { AsyncStorage } from "react-native";

export default class DecksStorage {
  key = "decks";

  getDecks() {}
  getDeck(id) {}

  saveDeckTitle(title) {
    const deck = { [title]: { title, questions: [] } };

    return AsyncStorage.getItem(this.key)
      .then(data => data || "{}")
      .then(data => JSON.parse(data))
      .then(decks => {
        const newDecks = { ...decks, ...deck };
        AsyncStorage.setItem(this.key, JSON.stringify(newDecks));
        return newDecks;
      });
  }

  addCardToDeck(title, card) {
    this.saveDeckTitle(title).then(decks => {
      const newDecks = { ...decks };
      const questions = newDecks[title].questions;
      newDecks[title].questions = [...questions, card];

      AsyncStorage.setItem(this.key, JSON.stringify(newDecks));
      return newDecks;
    });
  }
}
