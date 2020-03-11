import Parameter from "./parameter";
import Range from "./range";
import Graduation from "./graduation";
import Phrase from "./phrase";
import Stuff from "./stuff";
import Change from "./change";
import Stage from "./stage";
import Topic from "./topic";
import Interf from "./interf";

export default class Loc {
  params = [];
  ranges = [];
  grads = [];
  topics = [];

  stuffs = [];
  stages = [];
  phrases = [];

  lim = 15;

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

  cTopic(name, gradName, isFin, isStart, ...stages) {
    const topicId = this.getId("topics");
    this.addTopics(new Topic(name, gradName, isFin, isStart, topicId));
    this.addStages(topicId, ...stages);
  }

  addTopics(...topics) {
    this.topics = this.topics.concat(topics);
  }

  cStage(isStart, ...answers) {
    const stageId = this.getId("stages");
    this.addStuffs(stageId, ...answers);
    return new Stage(isStart, stageId);
  }

  addStages = (topicId, ...stages) => {
    if (this._getTopic(topicId)) {
      const newStages = stages.map(stage => {
        return { ...stage, topic_id: topicId };
      });
      this.stages = this.stages.concat(newStages);
    } else console.error(`Topic ${topicId} not found!`);
  };

  cStuff(props, ...phrases) {
    const { id: nextStageId, changes, isA } = props ? props : {};
    const stuffId = this.getId("stuffs");

    this.addPhrases(stuffId, phrases);
    return new Stuff(
      nextStageId,
      !isA ? changes.filter(c => c.term) : [],
      isA,
      stuffId
    );
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
    const phraseId = this.getId("phrases");
    return new Phrase(rangeName, text, phraseId);
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
      if (newValue > this.lim) {
        param.value = this.lim;
      } else if (newValue < 1) {
        param.value = 1;
      } else param.value = newValue;
    });
  }

  checkRange(rangeName) {
    const range = this._getRange(rangeName);
    const param = this._getParam(range.paramName);
    return param.value >= range.min && param.value <= range.max;
  }

  checkGrad = gradName => {
    const grad = this._getGrad(gradName);
    const ranges = grad.rangesNames.map(rName => this._getRange(rName));
    const params = [];
    ranges.forEach(range => {
      if (!params[range.paramName]) {
        params[range.paramName] = this.checkRange(range.name);
      }
    });
    for (let key in params) {
      if (!params[key]) return false;
    }
    return true;
  };

  idState = {};
  getId = type => {
    if (!this.idState[type]) this.idState[type] = 0;
    this.idState[type]++;
    return this.idState[type];
  };

  getStartId = () => {
    const startTopic = this.topics.find(topic => topic.isStart);
    const stages = this._getStages(startTopic.id);
    const startStage = stages.find(stage => stage.isStart);
    return startStage ? startStage.id : null;
  };

  calcStuff = stuffId => {
    const stuff = this.stuffs.find(s => s.id === stuffId);

    this._editParams(stuff.changes);
    return stuff.next_stage_id;
  };

  getCorrectPhrase = stuff => {
    const phrases = this._getPhrases(stuff.id);
    const neutralPhrase = phrases.find(phrase => !phrase.rangeName);
    for (let i in phrases) {
      const phrase = phrases[i];
      if (phrase.rangeName && this.checkRange(phrase.rangeName))
        return phrase.text;
    }

    return neutralPhrase.text;
  };

  checkAnswToGrad = stuff => {
    const nextStage = this.stages.find(
      stage => stage.id === stuff.next_stage_id
    );
    const topic = this._getTopic(nextStage.topic_id);
    return this.checkGrad(topic.graduation);
  };

  getInterfaceStage = id => {
    //ДОБАВИТЬ ПОДКЛЮЧЕНИЕ ФИНАЛОЧЕК КОГДА НАДО

    const necessity = 2;

    const stage = this.stages.find(s => s.id === id);
    stage.isBeen = true;

    const stuffs = this._getStuffs(id);

    const replicStuff = stuffs.find(stuff => stuff.isA);
    const replic = new Interf(this.getCorrectPhrase(replicStuff));

    const answersAll = stuffs.filter(stuff => {
      if (!stuff.isA) {
        const stage = this.stages.find(s => s.id === stuff.next_stage_id);
        return !stage.isBeen;
      } else return false;
    });

    const gradAnswers = answersAll.filter(stuff => this.checkAnswToGrad(stuff));
    const notGradAnswers = answersAll.filter(
      stuff => !this.checkAnswToGrad(stuff)
    );

    const gradDiff = necessity - gradAnswers.length;

    const resAnswers = gradAnswers.concat(
      notGradAnswers.slice(0, gradDiff > necessity ? 0 : gradDiff)
    );

    const interf = {
      answers: resAnswers.map(stuff => {
        return new Interf(this.getCorrectPhrase(stuff), stuff.id);
      }),
      replic
    };

    return interf;
  };

  ssign = data => {
    for (let key in data) {
      this[key] = data[key];
    }
  };
}
