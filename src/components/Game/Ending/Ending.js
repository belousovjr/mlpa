import React from "react";
import "./style.css";
import ImageItem from "./ImageItem";

export default class Ending extends React.Component {
  constructor() {
    super();
    this.endData = [
      {
        name: "gabriella",
        quantity: 5,
        audio: ""
      },
      {
        name: "taisa",
        quantity: 5,
        audio: ""
      },

      {
        name: "hurima",
        quantity: 7,
        audio: ""
      },
      {
        name: "leya",
        quantity: 8,
        audio: ""
      },
      {
        name: "lola",
        quantity: 4,
        audio: ""
      }
    ];
    this.state = { currentImg: 1, imagesLoaded: false };
    this.images = [];
    this.loader();
  }

  loader() {
    const endDataSum = this.endData
      .map(data => data.quantity)
      .reduce((a, b) => a + b, 0);

    this.endData.forEach(({ name, quantity }) => {
      for (let i = 1; i <= quantity; i++) {
        let img = new Image();
        img.src = `${window.location.href}/img/endings/${name}/${i}.png`;
        img.onload = event => {
          const { target } = event;
          this.images.push({ name: `${name}_${i}`, image: target });

          if (this.images.length === endDataSum) {
            this.setState({ imagesLoaded: true });
          }
        };
      }
    });
  }

  render() {
    const { currentImg, imagesLoaded } = this.state;
    const { endingNext, disabled, isEnding, topicName } = this.props;

    const imagesItems = [];

    if (imagesLoaded && isEnding) {
      const { name, quantity } = this.endData.find(e => e.name === topicName);

      for (let i = 1; i <= quantity; i++) {
        const isCurrent = i === currentImg;

        const image = this.images.find(
          ({ name: imgName }) => imgName === `${name}_${i}`
        );

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
            src={image?.image.src}
          />
        );
      }
    }
    const style = {
      display: isEnding ? "" : "none"
    };

    return (
      <div style={style} className="ending">
        {imagesItems}
      </div>
    );
  }
}
