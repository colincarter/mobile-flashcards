import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text } from "react-native";

class Quiz extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Quiz"
    };
  };

  render = () => {
    return (
      <View>
        <Text>Quiz</Text>
      </View>
    );
  };
}

export default connect()(Quiz);
