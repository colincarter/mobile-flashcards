import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import { View, TextInput, Button } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import DeckStorage from "../lib/storage";

class AddCard extends React.Component {
  static propTypes = {
    addCard: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = props => {
    return {
      title: "Add Card"
    };
  };

  state = {
    question: "",
    answer: ""
  };

  onChangeQuestion = question => {
    this.setState({ question });
  };

  onChangeAnswer = answer => {
    this.setState({ answer });
  };

  onButtonPress = () => {
    const deckName = this.props.navigation.state.params.deckName;
    this.props.addCard(deckName, this.state);
    new DeckStorage().addCardToDeck(deckName, this.state);
    this.setState({ question: "", answer: "" });
    this._question.clearText();
    this._answer.clearText();
    this.props.navigation.goBack(null);
  };

  render = () => {
    const { deckName } = this.props.navigation.state.params;
    const submitDisabled =
      this.state.question === "" || this.state.answer === "";

    return (
      <View>
        <FormLabel>Question</FormLabel>
        <FormInput
          placeholder="Enter your question"
          onChangeText={this.onChangeQuestion}
          ref={component => (this._question = component)}
        />
        <FormLabel>Answer</FormLabel>
        <FormInput
          placeholder="Enter your answer"
          onChangeText={this.onChangeAnswer}
          ref={component => (this._answer = component)}
        />
        <Button
          onPress={this.onButtonPress}
          title="Submit"
          disabled={submitDisabled}
        />
      </View>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(AddCard);
