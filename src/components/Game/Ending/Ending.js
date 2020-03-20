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

    const imagesItems = [];
    for (let i = 1; i <= quantity; i++) {
      const isCurrent = i === currentImg;

      imagesItems.push(
        <ImageItem
          isCurrent={isCurrent}
          isHiding={i < currentImg}
          goNext={() => {
            if (isCurrent) this.setState({ currentImg: currentImg + 1 });
          }}
          key={i}
          src={`${window.location.href}/img/endings/${name}/${i}.png`}
        />
      );
    }

    return <div className="ending">{imagesItems}</div>;
  }
}
