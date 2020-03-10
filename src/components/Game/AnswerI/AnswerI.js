import React from "react";
import './style.css'

export default class AnswerI extends React.Component {
  render() {
    const { answer, updateStage } = this.props;
    return (
      <div
          className="answer"
        onClick={() => {
          updateStage();
        }}
      >
        {answer.phrase}
      </div>
    );
  }
}
