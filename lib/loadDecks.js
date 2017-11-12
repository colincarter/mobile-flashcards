import DeckStorage from "./storage";
import { addDeck, addCard } from "../actions";

const loadDecks = async store => {
  const ds = new DeckStorage();
  const decks = await ds.getDecks();
  for (const deck in decks) {
    store.dispatch(addDeck(deck));
    decks[deck].questions.forEach(card => store.dispatch(addCard(deck, card)));
  }
};

export default loadDecks;
