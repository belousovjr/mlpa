export default class Stage {
  constructor(isStart, id) {
    this.id = id;
    this.isStart = isStart
  }
  isBeen = false;
  topic_id = null;
}
