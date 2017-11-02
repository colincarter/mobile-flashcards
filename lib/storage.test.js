import renderer from "react-test-renderer";
import { AsyncStorage } from "react-native";

jest.mock("react-native", () => ({
  items: {},
  AsyncStorage: {
    setItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        this.items[item] = value;
        resolve(value);
      });
    }),

    getItem: jest.fn(item => {
      return new Promise((resolve, reject) => {
        resolve(this.items[item]);
      });
    }),

    removeItem: jest.fn(item => {
      return new Promise((resolve, reject) => {
        resolve(delete this.items[item]);
      });
    })
  }
}));

import DeckStorage from "./storage";

const key = "decks";

describe("Storage tests", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem(key);
  });

  it("saves a deck title when there are no items in storage", async () => {
    expect.assertions(1);

    const expected = {
      Title: {
        title: "Title",
        questions: []
      }
    };

    const ds = new DeckStorage();
    const decks = ds.saveDeckTitle("Title");

    let data = await AsyncStorage.getItem(key);
    if (!data) {
      data = "{}";
    }

    const result = JSON.parse(data);
    expect(result).toEqual(expected);
  });

  it("when there are other saved entries", async () => {
    expect.assertions(1);

    const expected = {
      Hello: {
        title: "Hello",
        questions: []
      },
      Title: {
        title: "Title",
        questions: []
      }
    };

    await AsyncStorage.setItem(
      JSON.stringify({ Title: { title: "Title", questions: [] } })
    );

    const ds = new DeckStorage();
    ds.saveDeckTitle("Hello");
    let decks = await AsyncStorage.getItem(key);
    expect(decks).toEqual(expected);
  });

  it("adding a card to a deck", async () => {
    expect.assertions(1);

    const expected = {
      Hello: {
        title: "Hello",
        questions: [
          {
            question: "Hello",
            answer: "World"
          }
        ]
      }
    };

    const ds = new DeckStorage();
    ds.addCardToDeck("Hello", { question: "Hello", answer: "World" });

    let data = await AsyncStorage.getItem(key);
    if (!data) {
      data = "{}";
    }

    const decks = JSON.parse(data);
    expect(result).toEqual(expected);
  });
});
