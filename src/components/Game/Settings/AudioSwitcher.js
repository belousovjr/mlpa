import React from "react";
import "./style.css";

export default class AudioSwitcher extends React.Component {
  render() {
    const { audioSwitch, audioPlayed } = this.props;

    const icoClass = audioPlayed ? "fas fa-volume-up" : "fas fa-volume-mute";

    return (
      <div className="sett">
        <button
          className={`${icoClass} sett-btn`}
          onClick={() => {
            audioSwitch();
          }}
        ></button>
      </div>
    );
  }
}
