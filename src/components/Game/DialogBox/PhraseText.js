import React from "react";
import "./style.css";

export default class PhraseText extends React.Component {
  constructor(props) {
    super(props);
    const { text } = props;
    this.state = { curr: 0, max: text?.length | 0, isShowed: false };
  }

  nextLetter() {
    const { curr, max } = this.state;
    setTimeout(() => {
      this.setState({ curr: curr + 1 });
    }, 300 / max);
  }
  show() {
    setTimeout(() => {
      this.setState({ isShowed: true });
    }, 200);
  }

  render() {
    const { text, isPlayer, finishDetected } = this.props;

    const { curr, max, isShowed} = this.state

    if(!isShowed)this.show()
    else if(curr < max)this.nextLetter()
    else {
      finishDetected()
    }

    const currentText = text.slice(0, curr)

    const colorClass = isPlayer ? "text-p" : "text-c";
    const title = isPlayer ? "Я" : "Она";

    return (
      <div className={`phrase-text phrase-showing`}>
        <span className={colorClass}>{title}/</span>; {currentText}
      </div>
    );
  }
}
