export default class Stage {
  constructor(id, answer, pAnswers) {
    this.id = id;
    this.answer = answer;
    this.pAnswers = pAnswers;
  }
  topicName = null;
  isBeen = false;
}
