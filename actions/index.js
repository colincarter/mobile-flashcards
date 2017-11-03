import { ADD_DECK, ADD_CARD } from "../constants";
import { DecksStorage } from "../lib/storage";

export function addDecks(decks) {
  for (const deck in decks) {
    addDeck(deck.title);
    for (const card in deck.questions) {
      addCard(card);
    }
  }
}

export function addDeck(deck) {
  return dispatch => {
    dispatch({ type: ADD_DECK, deck });
  };
}

export function addCard(deck, card) {
  return dispatch => {
    dispatch({ type: ADD_CARD, deck, card });
  };
}
