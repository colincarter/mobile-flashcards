import defaultState from "../store/defaultState";
import { ADD_CARD } from "../constants";

const cards = (state = defaultState.cards, action) => {
  switch (action.type) {
    case ADD_CARD:
      const cards = state[action.deck] || [];
      return { ...state, [action.deck]: [...cards, action.card] };

    default:
      return state;
  }
};

export default cards;
