import React from "react";

import {
  RANGE_PANIC,
  RANGE_TENSION,
  RANGE_STABILITY
} from "../../../game/ranges";
import AudioElement from "./audio-element";

export default class AudioPlayer extends React.Component {
  constructor() {
    super();
    this.musics = [
      new AudioElement(RANGE_PANIC, this.getAudio("bells"), "bells"),
      new AudioElement(
        RANGE_TENSION,
        this.getAudio("piano-trap"),
        "piano-trap"
      ),
      new AudioElement(RANGE_STABILITY, this.getAudio("piano"), "piano")
    ];
  }

  getAudio(fileN) {
    const audio = new Audio(`${window.location.href}/audio/music/${fileN}.wav`);
    audio.loop = true;
    audio.preload = "auto";

    return audio;
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

      return result?.fileName || "";
    }
  }

  render() {
    const { audioPlayed } = this.props;

    const fileName = this.getAudioName();

    this.musics.forEach(m => {
      if (m.fileName === fileName && audioPlayed) m.isPlayed = true;
      else m.isPlayed = false;
    });

    return null;
  }
}
