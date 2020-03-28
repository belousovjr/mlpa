import React from "react";
import "./style.css";

export default class PhraseText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStart: true, curText: "", balText: "" };
  }
  checkPoint(string) {
    const points = [".", "!", "?"];
    return Boolean(points.find(p => `${p} ` === string));
  }
  nextLetterLoop() {
    const { text, pAnsswerd, writingFinish, isPlayer } = this.props;

    const { curText } = this.state;
    if (text !== curText) {
      const curLen = curText.length;

      const newText = text.slice(0, curLen + 1);
      const balText = text.slice(curLen + 1);

      const isPoint = this.checkPoint(
        newText.substr(newText.length - 2, newText.length)
      );

      const timeout = isPoint ? Math.random() * 350 + 150 : 20;

      setTimeout(() => {
        this.setState({ curText: newText, isStart: false, balText });
        this.nextLetterLoop();
      }, timeout);
    } else isPlayer ? pAnsswerd() : writingFinish();
  }
  render() {
    const { isPlayer, isEnding } = this.props;
    const { isStart, curText, balText } = this.state;
    if (isStart) this.nextLetterLoop();
    const title = isEnding ? "" : isPlayer ? "Я" : "Она";
    const titleClass = isPlayer ? "text-p" : "text-c";
    return (
      <div className="phrase-text">
        <span className={titleClass}>{title}/</span> {curText}
        <span className="bal-text">{balText}</span>
      </div>
    );
  }
}
