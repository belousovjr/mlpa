import React from "react";
import "./style.css";

export default class AnswerI extends React.Component {
  render() {
    const { text, click, disabled, isHiding } = this.props;
    const disClass = disabled ? (isHiding ? "disabled" : "") : "undisabled";
    return (
      <div>
        <div
          className={`answer ${disClass}`}
          onClick={() => {
            if (!disabled) click();
          }}
        >
          {text.toUpperCase()}
        </div>
      </div>
    );
  }
}
