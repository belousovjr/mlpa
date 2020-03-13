import React from "react";
import "./style.css";
import PhraseText from "./PhraseText";

export default class PhraseI extends React.Component {
  constructor(props) {
    super(props);

    this.phrases = [
      { isPlayer: true, text: "Приветик", isFinished: false, inProcess: true },
      {
        isPlayer: false,
        text: "Приветикккк",
        isFinished: false,
        inProcess: false
      }
    ];
  }

  finishDetected(index) {
    this.phrases[index].isFinished = true;
  }

  render() {
    const { hiding } = this.props;

    const hidingClass = hiding ? "phrase-hiding" : "";

    const phraseItems = this.phrases
      .filter(p => p.inProcess)
      .map(({ text, isPlayer, isShowClass }, index) => (
        <PhraseText
          key={index}
          text={text}
          isPlayer={isPlayer}
          finishDetected={() => {
            this.finishDetected(index);
          }}
        />
      ));

    return (
      <div className={`phrase-interface ${hidingClass}`}>
        <div className="phrase-text">{phraseItems}</div>
      </div>
    );
  }
}
