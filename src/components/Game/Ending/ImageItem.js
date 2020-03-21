import React from "react";
import "./style.css";

export default class ImageItem extends React.Component {
  render() {
    const { src, isCurrent, isHiding, goNext } = this.props;
    const className = isCurrent ? "appear" : isHiding ? "extin" : "";

    return (
      <div className={`end-cont ${className}`}>
        <img onClick={goNext} className="end-img" src={src} alt={'img'} />
      </div>
    );
  }
}
