import React from "react";
import "./style.css";
import PhraseText from "./PhraseText";

export default class DialogBox extends React.Component {
  constructor() {
    super();
    this.state = { isPAnsserd: false };
  }

  pAnsswerd = () => {
    const { dDelay } = this.props;
    setTimeout(() => {
      this.setState({ isPAnsserd: true });
    }, dDelay);
  };
  render() {
    const {
      pPhrase,
      cPhrase,
      writingFinish,
      hiding,
      isEnding,
      isLoaded
    } = this.props;
    const { isPAnsserd } = this.state;

    const hidingClass = hiding ? "phrase-hiding" : "";

    const pAnswer =
      isLoaded && !isEnding ? (
        <PhraseText
          isEnding={isEnding}
          text={pPhrase}
          isPlayer
          pAnsswerd={this.pAnsswerd}
        />
      ) : null;

    const cAnswer =
      isPAnsserd || isEnding ? (
        <PhraseText
          isEnding={isEnding}
          text={cPhrase}
          writingFinish={writingFinish}
        />
      ) : null;

    return (
      <div className="dialog-box">
        <div className={`phrase-interface ${hidingClass}`}>
          <div className="phrase-content">
            {pAnswer}
            {cAnswer}
          </div>
        </div>
      </div>
    );
  }
}
