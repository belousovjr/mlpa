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
    }
    if (param) {
      const newMaxSpeed = param.value < 3 ? 6 : param.value < 10 ? 0.1 : 0.05;

      const newMaxAmpl = -Math.sin((param.value / 15) * (-Math.PI / 2)) * 10;

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
