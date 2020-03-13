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
    const { pPhrase, cPhrase, writingFinish, hiding } = this.props;
    const { isPAnsserd } = this.state;

    const hidingClass = hiding ? "phrase-hiding" : "";

    const cAnswer = isPAnsserd ? (
      <PhraseText text={cPhrase} writingFinish={writingFinish} />
    ) : null;

    return (
      <div className="dialog-box">
        <div className={`phrase-interface ${hidingClass}`}>
          <div className="phrase-content">
            <PhraseText text={pPhrase} isPlayer pAnsswerd={this.pAnsswerd} />
            {cAnswer}
          </div>
        </div>
      </div>
    );
  }
}
