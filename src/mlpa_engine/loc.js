import Parameter from "./parameter";
import Range from "./range";
import Graduation from "./graduation";
import Phrase from "./phrase";
import Stuff from "./stuff";
import Change from "./change";
import Stage from "./stage";
import Topic from "./topic";

export default class Loc {
  params = [];
  ranges = [];
  grads = [];
  topics = [];

  stuffs = [];
  stages = [];
  phrases = [];

  cParam(name, value) {
    return new Parameter(name, value);
  }
  addParams(...params) {
    this.params = this.params.concat(params);
  }

  cRange(name, min, max, paramName) {
    return new Range(name, paramName, min, max);
  }
  addRanges(...ranges) {
    this.ranges = this.ranges.concat(ranges);
  }

  cGrad(name, ...rangesNames) {
    return new Graduation(name, rangesNames);
  }
  addGrads(...grads) {
    this.grads = this.grads.concat(grads);
  }

  cTopic(name, gradName, ...stages) {
    const topicId = this.getId("topics");
    this.addTopics(new Topic(name, gradName, topicId));
    this.addStages(topicId, ...stages);
  }

  addTopics(...topics) {
    this.topics = this.topics.concat(topics);
  }

  cStage(...answers) {
    const stageId = this.getId("stages");
    this.addStuffs(stageId, ...answers);
    return new Stage(stageId);
  }

  addStages(topicId, ...stages) {
    if (this._getTopic(topicId)) {
      const newStages = stages.map(stage => ({ ...stage, topic_id: topicId }));
      this.stages = this.stages.concat(newStages);
    } else console.error(`Topic ${topicId} not found!`);
  }

  cStuff(props, ...phrases) {
    const { id: nextStageId, changes, isA } = props ? props : {};
    const stuffId = this.getId("stuffs");
    this.addPhrases(stuffId, phrases);
    return new Stuff(nextStageId, changes, isA, stuffId);
  }

  addStuffs(stageId, ...stuffs) {
    const newStuffs = stuffs.map(stuff => ({ ...stuff, stage_id: stageId }));
    this.stuffs = this.stuffs.concat(newStuffs);
  }

  addPhrases(stuffId, phrases) {
    const newPhrases = phrases.map(phrase => ({
      ...phrase,
      stuff_id: stuffId
    }));

    this.phrases = this.phrases.concat(newPhrases);
  }

  cPhrase(text, rangeName) {
    return new Phrase(rangeName, text, this.getId("phrases"));
  }

  cChange(paramName, term) {
    return new Change(paramName, term);
  }

  _getTopic(id) {
    return this.topics.find(topic => topic.id === id);
  }
  _getStages = topicId => {
    return this.stages.filter(stage => stage.topic_id === topicId);
  };

  _getStuffs = stageId => {
    return this.stuffs.filter(stuff => stuff.stage_id === stageId);
  };

  _getPhrases = stuffId => {
    return this.phrases.filter(phrase => phrase.stuff_id === stuffId);
  };

  _updateGrad(topicId, gradName){
    const topic = this._getTopic(topicId)
    topic.graduation = gradName
  }

  _getParam(name) {
    return this.params.find(param => param.name === name);
  }

  _getRange(name) {
    return this.ranges.find(range => range.name === name);
  }

  _getGrad(name) {
    return this.grads.find(grad => grad.name === name);
  }

  _editParams(changes) {
    changes.forEach(change => {
      const param = this._getParam(change.paramName);

      const newValue = param.value + change.term;
      if (newValue > param.lim) {
        param.value = param.lim;
      } else if (newValue < 0) {
        param.value = 0;
      } else param.value = newValue;
    });
  }

  checkRange(rangeName) {
    const range = this._getRange(rangeName);
    const param = this._getParam(range.paramName);
    return param.value >= range.min && param.value <= range.max;
  }

  checkGrad(gradName) {
    const grad = this._getGrad(gradName);

    for (let i = 0; i < grad.rangesNames.length; i++) {
      const range = this._getRange(grad.rangesNames[i]);
      if (!this.checkRange(range.value)) return false;
    }
    return true;
  }

  idState = {};
  getId(type) {
    if (!this.idState[type]) this.idState[type] = 0;
    this.idState[type]++;
    return this.idState[type];
  }

  ssign(data) {
    for (let key in data) {
      if (Boolean(this[key])) this[key] = data[key];
    }
  }
}
