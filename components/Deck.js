import React from "react";
import { ListItem } from "react-native-elements";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Deck extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    cards: PropTypes.object.isRequired,
    onPressItem: PropTypes.func.isRequired
  };

  onPress = () => {
    this.props.onPressItem(this.props.name);
  };

  render = () => {
    const cards = this.props.cards[this.props.name] || [];
    const numCards = cards.length;
    const subtitle = numCards === 1 ? "Card" : "Cards";

    return (
      <ListItem
        title={this.props.name}
        subtitle={`${numCards} ${subtitle}`}
        onPress={this.onPress}
      />
    );
  };
}

const mapStateToProps = ({ cards }) => ({
  cards
});
export default connect(mapStateToProps)(Deck);
