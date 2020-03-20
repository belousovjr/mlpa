import React from "react";

export default class FullScreen extends React.Component {
  constructor() {
    super();
    this.state = { isFullScren: false };
  }
  getFullScreen() {
    return Boolean(document.fullscreenElement);
  }
  fullScreenOn() {
    const screenDom = document.getElementById("screenDom");

    if (this.getFullScreen()) document.exitFullscreen();
    else screenDom.requestFullscreen();

    this.setState({ isFullScren: !this.getFullScreen() });
  }
  render = () => {
    const {isFullScren} = this.state

    const icoClass = isFullScren ? "fas fa-compress" : "fas fa-expand";

    return (
      <div className="sett">
        <button
          className={`${icoClass} sett-btn`}
          onClick={() => {
            this.fullScreenOn();
          }}
        ></button>
      </div>
    );
  };
}
