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
    return new Topic(name, gradName, stages);
  }

  addTopics(...topics) {
    this.topics = this.topics.concat(topics);
  }

  cPhrase(text, rangeName) {
    return new Phrase(rangeName, text);
  }

  cStuff(props, ...phrases) {
    const { id: nextStageId, changes } = props ? props : {};
    return new Stuff(nextStageId, changes, phrases);
  }

  cStage(id, answer, ...pAnswers) {
    return new Stage(id, answer, pAnswers);
  }

  cChange(paramName, term) {
    return new Change(paramName, term);
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
  /*
    idState = []
    getId(type){
      if(!this.idState[type])this.idState[type]=0
      this.idState[type]++
      return this.idState[type]
    }*/
}
