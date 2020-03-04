import React from "react";

export default class StuffItem extends React.Component {
  render() {
    const { stuff } = this.props;

    const { phrases } = stuff;

    const phrasesItems = phrases.map((phrase, i) => (
      <div key={i}>{phrase.text}</div>
    ));

    return (
      <div>
        <h3>Answer:</h3>
        {phrasesItems}
      </div>
    );
  }
}
