export default class Stuff {
  constructor(next_stage_id, changes = [], phrases) {
    this.next_stage_id = next_stage_id;
    this.changes = changes;
    this.phrases = phrases;
  }
}
