import { StackNavigator, TabNavigator } from "react-navigation";
import AddDeck from "./components/AddDeck";
import Decks from "./components/Decks";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

const Tabs = TabNavigator({
  Decks: {
    screen: Decks
  },
  AddDeck: {
    screen: AddDeck
  }
});

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});

export default MainNavigation;
