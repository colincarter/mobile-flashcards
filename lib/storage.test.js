import MockAsyncStorage from "mock-async-storage";

import renderer from "react-test-renderer";

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock("AsyncStorage", () => mockImpl);
};

mock();

import DeckStorage from "./storage";
import { AsyncStorage as storage } from "react-native";

describe("Storage tests", () => {
  it("saves a deck title when there are no items in storage", async () => {
    const expected = {
      Title: {
        title: "Title",
        questions: []
      }
    };

    const ds = new DeckStorage();
    ds.saveDeckTitle("Title");

    const value = await storage.getItem("decks");

    expect(value).toEqual(expected);
  });
});
