import { ADD_DECK } from "../constants";
import { DecksStorage } from "../lib/storage";

export function addDeck(deck) {
  return dispatch => {
    dispatch({ type: ADD_DECK, deck });
  };
}
