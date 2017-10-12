import { AsyncStorage } from "react-native";

export class DecksStorage {
  key = "decks";

  async get() {
    let data = (await AsyncStorage.getItem(this.key)) || [];
    return JSON.parse(data);
  }

  async set(data) {
    const origData = this.get();
    const newData = [...origData, data];
    await AsyncStorage.setItem(this.key, JSON.stringify(newData));
  }
}
