import React from "react";
import "./style.css";
import PhraseText from "./PhraseText";

export default class DialogBox extends React.Component {
  render() {
    const { pPhrase, cPhrase } = this.props;
    return (
      <div className="dialog-box">
        <div className="phrase-interface">
          <PhraseText text={pPhrase} isPlayer />
        </div>
        <div className="phrase-interface">
          <PhraseText text={cPhrase} />
        </div>
      </div>
    );
  }
}
