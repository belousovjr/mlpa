import React from "react";

export default class FullScreen extends React.Component {
  fullScreenOn() {
    const screenDom = document.getElementById("screenDom");
    screenDom.requestFullscreen();
  }
  render = () => {
    return (
      <button
        onClick={() => {
          this.fullScreenOn();
        }}
      >
        Full Screen
      </button>
    );
  };
}
