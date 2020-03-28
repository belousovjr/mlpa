export default class Topic {
  constructor(name, graduation, isFin, isStart, id, stuffIntro) {
    this.name = name;
    this.gradNames = [graduation]
    this.isFin = isFin;
    this.isStart = isStart;
    this.id = id;
    this.stuffIntro = stuffIntro
  }
}
