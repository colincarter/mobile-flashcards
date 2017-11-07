import { AsyncStorage } from "react-native";

export default class DeckStorage {
  key = "decks";

  async getDecks() {
    const data = await AsyncStorage.getItem(this.key);
    return (await JSON.parse(data)) || {};
  }

  getDeck(id) {
    const decks = this.getDecks();
    return decks[id];
  }

  async saveDeckTitle(title) {
    const deck = { [title]: { title, questions: [] } };
    const decks = await this.getDecks();

    const newDecks = { ...decks, ...deck };

    await AsyncStorage.setItem(this.key, JSON.stringify(newDecks));

    return newDecks;
  }

  async addCardToDeck(title, card) {
    const decks = await this.getDecks();
    const questions = decks[title].questions;
    decks[title].questions = [...questions, card];

    await AsyncStorage.setItem(this.key, JSON.stringify(decks));

    return decks;
  }
}
