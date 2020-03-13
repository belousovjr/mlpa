import React from "react";
import "./style.css";

export default class PhraseText extends React.Component {
  render() {
    const { isPlayer, text } = this.props;
    const title = isPlayer ? "Я" : "Она";
    const titleClass = isPlayer ? "text-p" : "text-c";
    return (
      <div className={`phrase-text`}>
        <span className={titleClass}>{title}/</span> {text}
      </div>
    );
  }
}
