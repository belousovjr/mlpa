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
        const stuffs = this._getStuffs(stage.id);
        stuffs.forEach(stuff => {
          const { next_topic, isA } = stuff;
          if (!next_topic && !isA) stuff.next_topic = topicId;
        });
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
    //ИЗМЕНИТЬ
    const grad = this._getGrad(gradName);

    for (let i = 0; i < grad.rangesNames.length; i++) {
      const range = this._getRange(grad.rangesNames[i]);
      if (!this.checkRange(range.value)) return false;
    }
    return true;
  }

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
    //ДОБАВИТЬ СОБСТВЕННО РАССЧЕТ
    const stuff = this.stuffs.find(s => s.id === stuffId);
    return stuff.next_stage_id;
  };

  getInterfaceStage = id => {
    //ДОБАВИТЬ ЗАВИСИМОСТЬ ОТ ДОСТУПНЫХ ТЕМ
    const stuffs = this._getStuffs(id);

    class Interf {
      constructor(phrase, id) {
        this.phrase = phrase;
        this.id = id;
      }
    }

    const getCorrectPhrase = stuff => {
      const phrases = this._getPhrases(stuff.id);
      const neutralPhrase = phrases.find(phrase => !phrase.rangeName);
      for (let i in phrases) {
        const phrase = phrases[i];
        if (phrase.rangeName && this.checkRange(phrase.rangeName))
          return phrase.text;
      }
      return neutralPhrase.text;
    };

    const interf = { replic: null, answers: [] };

    const charStuff = stuffs.find(stuff => stuff.isA);

    interf.replic = charStuff ? new Interf(getCorrectPhrase(charStuff)) : null;
    interf.answers = stuffs
      .filter(stuff => !stuff.isA)
      .map(stuff => {
        return new Interf(getCorrectPhrase(stuff), stuff.id);
      });

    return interf;
  };

  ssign = data => {
    for (let key in data) {
      this[key] = data[key];
    }
  };
}
