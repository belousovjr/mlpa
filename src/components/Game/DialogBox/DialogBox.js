import React from "react";
import "./style.css";
import PhraseI from "./PhraseI";

export default class DialogBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="dialog-box">
        <PhraseI  />
      </div>
    );
  }
}
