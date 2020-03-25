import React from "react";
import "./style.css";
import ImageItem from "./ImageItem";

export default class Ending extends React.Component {
  constructor() {
    super();
    this.endData = {
      name: "call",
      quantity: 4,
      audio: ""
    };
    this.state = { currentImg: 1 };
  }

  render() {
    const { name, quantity } = this.endData;
    const { currentImg } = this.state;
    const { endingNext, disabled } = this.props;

    const imagesItems = [];
    for (let i = 1; i <= quantity; i++) {
      const isCurrent = i === currentImg;

      imagesItems.push(
        <ImageItem
          disabled={disabled || !isCurrent}
          isCurrent={isCurrent}
          isHiding={i < currentImg}
          goNext={() => {
            if (isCurrent && currentImg - 1 < quantity && !disabled) {
              this.setState({ currentImg: currentImg + 1 });
              endingNext();
            } else alert("ТИТРЫ");
          }}
          key={i}
          src={`${window.location.href}/img/endings/${name}/${i}.png`}
        />
      );
    }

    return <div className="ending">{imagesItems}</div>;
  }
}
