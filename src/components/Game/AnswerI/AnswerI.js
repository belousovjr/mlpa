import React from "react";
import "./style.css";

export default class AnswerI extends React.Component {
  render() {
    const { text, click, disabled, isHiding, isAchiev } = this.props;
    const disClass = disabled ? (isHiding ? "disabled" : "") : "undisabled";
    const achievClass = isAchiev ? 'achievement' : '';
    return (
        <div>
      <div
        className={`answer ${disClass} ${achievClass}`}
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
