import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

class Stats extends React.Component {
  static propTypes = {
    numCards: PropTypes.number.isRequired,
    correctCount: PropTypes.number.isRequired,
    incorrectCount: PropTypes.number.isRequired
  };

  render = () => {
    return (
      <Card title="Quiz Stats">
        <Text>
          Correct:{" "}
          {Math.round(this.props.correctCount / this.props.numCards * 100)}%
        </Text>
        <Text>
          Incorrect:{" "}
          {Math.round(this.props.incorrectCount / this.props.numCards * 100)}%
        </Text>
      </Card>
    );
  };
}

export default Stats;
