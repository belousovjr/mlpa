import React from "react";
import {
  RANGE_PANIC,
  RANGE_TENSION,
  RANGE_STABILITY
} from "../../../game/ranges";

export default class Audio extends React.Component {
  constructor() {
    super();
    this.musics = [
      { rangeName: RANGE_PANIC, file: "bells" },
      { rangeName: RANGE_TENSION, file: "piano-trap" },
      { rangeName: RANGE_STABILITY, file: "piano" }
    ];
  }
  correctRanges() {
    const { ranges, checkRange } = this.props;
    const corrRanges = ranges.filter(r => checkRange(r.name));

    return corrRanges;
  }
  getAudioName() {
    const corrRanges = this.correctRanges();
    for (let range of corrRanges) {
      const result = this.musics.find(m => m.rangeName === range.name);

      return result?.file || "";
    }
  }

  render() {
    const fileName = this.getAudioName();
    const audio = fileName ? (
      <audio
        ref="audio"
        loop
        autoPlay
        src={`${window.location.href}/audio/music/${fileName}.wav`}
      />
    ) : null;

    return (
      <div
        style={{
          backgroundColor: "red",
          position: "absolute",
          top: 200,
          left: 0
        }}
      >
        {audio}
        Audio
      </div>
    );
  }
}
