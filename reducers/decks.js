import defaultState from "../store/defaultState";
import { ADD_DECK } from "../constants";

const decks = (state = defaultState.decks, action) => {
  switch (action.type) {
    case ADD_DECK:
      return [...state, action.deck];

    default:
      return state;
  }
};

export default decks;
