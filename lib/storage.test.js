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
  it("saves a deck title when there are no items in storage", done => {
    const expected = {
      Title: {
        title: "Title",
        questions: []
      }
    };

    const ds = new DeckStorage();
    ds.saveDeckTitle("Title").then(_ => {
      storage.getItem("decks").then(decks => {
        const value = (decks = decks || "{}") && JSON.parse(decks);
        expect(value).toEqual(expected);
        done();
      });
    });
  });

  it("when there are other saved entries", done => {
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

    const ds = new DeckStorage();
    ds.saveDeckTitle("Hello").then(_ => {
      storage.getItem("decks").then(decks => {
        const value = (decks = decks || "{}") && JSON.parse(decks);
        expect(value).toEqual(expected);
        done();
      });
    });
  });
});
