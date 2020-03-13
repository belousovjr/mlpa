import React from "react";
import "./style.css";

export default class AnswerI extends React.Component {
  render() {
    const { text, click, disabled } = this.props;
    const disClass = disabled ? "disabled" : "";
    return (
      <div
        className={`answer ${disClass}`}
        onClick={() => {
          if (!disabled) click();
        }}
      >
        {text}
      </div>
    );
  }
}
