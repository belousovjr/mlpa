export default class Shaking {
  constructor(speed, ampl) {
    this.maxSpeed = speed;
    this.maxAmpl = ampl;
    this.speed = speed;
    this.ampl = ampl;
  }
  value = 0;
  stage = 0;

  calcSpeed = () => {
    this.speed = Math.random() * this.maxSpeed * 0.3 + this.maxSpeed * 0.7;
  };
  calcAmpl = () => {
    this.ampl = Math.random() * this.maxAmpl * 0.5 + this.maxAmpl * 0.5;
  };
  update = param => {
    this.stage += this.speed;

    if (this.stage > 2 * Math.PI) {
      this.stage = 0;

      this.calcAmpl();
      this.calcSpeed();
    } else if (param) {
      const newMaxSpeed = 11.25 / Math.pow(param.value + 1, 2);
      const newMaxAmpl = Math.pow(param.value + 1, 1.5) / 5.809;
      if (this.maxSpeed !== newMaxSpeed) {
        this.maxSpeed = newMaxSpeed;
        this.calcSpeed();
      }
      if (this.maxAmpl !== newMaxAmpl) {
        this.maxAmpl = newMaxAmpl;
      }
    }

    this.value = Math.sin(this.stage) * this.ampl;
  };
}
