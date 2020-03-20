export default class AudioElement {
  constructor(rangeName, audio, fileName) {
    this.rangeName = rangeName;
    this.fileName = fileName;
    this.audio = audio;
    this.audio.volume = 0;

    this.isPlayed = false;
    this.vStep = 1;
    this.vMax = 10;

    this.updateLoop();
  }

  updateLoop = () => {
    if (this.isPlayed) {
      this.play();
      if (this.volume < this.vMax) this.volume += this.vStep;
    } else {
      if (this.volume > 0) {
        this.volume -= this.vStep;
      }
    }
    setTimeout(this.updateLoop, 600);
  };

  get volume() {
    return this.audio.volume * this.vMax;
  }
  set volume(value) {
    this.audio.volume = value / this.vMax;
  }
  play = () => {
    this.audio.play();
  };
}
