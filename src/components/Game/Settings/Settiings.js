import React from "react";
import FullScreen from "./FullScreen";
import AudioSwitcher from "./AudioSwitcher";

export default class Settings extends React.Component {
  render() {
    const {methods, data} = this.props
    return (
      <div className="settings">
        <FullScreen />
        <AudioSwitcher audioSwitch={methods.audioSwitch} audioPlayed={data.audioPlayed} />
      </div>
    );
  }
}
