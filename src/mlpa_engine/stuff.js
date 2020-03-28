export default class Stuff {
  constructor(next_stage_id, changes = [], isA = false, id) {
    this.next_stage_id = next_stage_id;
    this.changes = changes;
    this.isA = isA;
    this.id = id;
  }
  isIntro = false;
  stage_id = null;
}
