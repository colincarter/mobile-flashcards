import "react-native";
import MockAsyncStorage from "mock-async-storage";
import renderer from "react-test-renderer";

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock("AsyncStorage", () => mockImpl);
};

mock();

import { AsyncStorage as storage } from "react-native";
import DeckStorage from "./storage";

const key = "decks";

describe("Storage tests", () => {
  afterEach(async () => {
    await storage.removeItem(key);
  });

  it("saves a deck title when there are no items in storage", async () => {
    const expected = {
      Title: {
        title: "Title",
        questions: []
      }
    };

    const ds = new DeckStorage();
    const decks = await ds.saveDeckTitle("Title");

    let data = await storage.getItem(key);
    const result = (await JSON.parse(data)) || {};
    expect(result).toEqual(expected);
  });

  it("when there are other saved entries", async () => {
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

    await storage.setItem(
      JSON.stringify({ Title: { title: "Title", questions: [] } })
    );

    const ds = new DeckStorage();
    await ds.saveDeckTitle("Hello");
    let decks = await storage.getItem(key);
    expect(decks).toEqual(expected);
  });

  it("adding a card to a deck", async () => {
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
    await ds.addCardToDeck("Hello", { question: "Hello", answer: "World" });

    let data = await storage.getItem(key);
    const decks = (await JSON.parse(data)) || {};
    expect(decks).toEqual(expected);
  });
});
