import React from "react";
import "./style.css";

export default class ImageItem extends React.Component {
  render() {
    const { src, isCurrent, isHiding, goNext, disabled } = this.props;
    const className = isCurrent ? "appear" : isHiding ? "extin" : "";
    const disClassName = !disabled ? "not-dis" : "";

    return (
      <div className={`end-cont ${className} ${disClassName}`}>
        <img
          onClick={() => {
            if (!disabled) {
              goNext();
            }
          }}
          className="end-img"
          src={src}
          alt={"img"}
        />
      </div>
    );
  }
}
