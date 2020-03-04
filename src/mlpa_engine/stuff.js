export default class Stuff {
  constructor(next_stage_id, changes = [], id) {
    this.next_stage_id = next_stage_id;
    this.changes = changes;
    this.id = id;
  }
  stage_id = null;
}
