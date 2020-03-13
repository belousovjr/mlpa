import React from "react";
import "./style.css";

export default class AnswerI extends React.Component {
  render() {
    const { text, click } = this.props;
    return (
      <div className="answer" onClick={click}>
        {text}
      </div>
    );
  }
}
