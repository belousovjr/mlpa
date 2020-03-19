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

  cParam(name, value, isAchiev) {
    return new Parameter(name, value, isAchiev);
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
    const { id: nextStageId, changes = [], isA } = props ? props : {};
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

  cPhrase(text, isGeneral = false, rangeName) {
    const phraseId = this.getId("phrases");
    return new Phrase(rangeName, text, isGeneral, phraseId);
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

  _getParam = name => {
    return this.params.find(param => param.name === name);
  };

  _getRange(name) {
    return this.ranges.find(range => range.name === name);
  }

  _getGrad(name) {
    return this.grads.find(grad => grad.name === name);
  }

  _editParams(changes) {
    changes.forEach(change => {
      const param = this._getParam(change.paramName);

      if (param.isAchiev) {
        param.value = true;
      } else {
        const newValue = param.value + change.term;
        if (newValue > this.lim) {
          param.value = this.lim;
        } else if (newValue < 1) {
          param.value = 1;
        } else param.value = newValue;
      }
    });
  }

  checkStageFinal = stageId => {
    const stuffs = this._getStuffs(stageId);
    return !stuffs.find(s => !s.isA);
  };

  checkRange = rangeName => {
    const range = this._getRange(rangeName);
    const param = this._getParam(range.paramName);
    const res = param.isAchiev
      ? param.value === range.max
      : param.value >= range.min && param.value <= range.max;
    return res;
  };

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

  getGeneralPhrase = stuffId => {
    const stuff = this.stuffs.find(s => s.id === stuffId);
    const phrases = this._getPhrases(stuff.id);
    const generalPhrase = phrases.find(phrase => phrase.isGeneral);
    return generalPhrase?.text;
  };

  getCorrectPhrase = stuffId => {
    const stuff = this.stuffs.find(s => s.id === stuffId);
    const phrases = this._getPhrases(stuff.id);
    const neutralPhrase = phrases.find(phrase => !phrase.rangeName);
    for (let i in phrases) {
      const phrase = phrases[i];
      if (phrase.rangeName && this.checkRange(phrase.rangeName))
        return phrase.text;
    }

    return neutralPhrase.text;
  };

  _getCorrectStuffs(id) {
    //НЕОБХОДИМОЕ ЧИСЛО ОТВЕТОВ
    const necessity = 3;
    const stuffs = this._getStuffs(id);

    //ОГРАНИЧЕНИЕ ПО *БЫЛ ЗДЕСЬ*
    const answersAll = stuffs.filter(stuff => {
      if (stuff.isA) return false;
      else {
        const stage = this.stages.find(s => s.id === stuff.next_stage_id);
        return !stage.isBeen;
      }
    });

    const correctNeutAchiev = [];
    const correctFinal = [];
    const incrrectNeutral = [];

    answersAll.forEach(stuff => {
      const nextStage = this.stages.find(
        stage => stage.id === stuff.next_stage_id
      );
      const topic = this._getTopic(nextStage.topic_id);
      const grad = this._getGrad(topic.graduation);
      const ranges = grad.rangesNames(rName => this._getRange(rName));
      const params = ranges.rangesNames(r => this._getParam(r.paramName));

      const isAchiev = params.find(p => p.isAchiev);
      const correct = this.checkGrad(grad.name);
      const { isFin } = topic;

      if (correct) {
        //подходящее по градации
        //если не финал
        if (!isFin) correctNeutAchiev.push(stuff);
        //если финал
        else correctFinal.push(stuff);
      } else if (!isAchiev && !isFin) {
        //неподходящие если не ачивный и не финальный
        incrrectNeutral.push(stuff);
      }
    });

    let resultStuffs = correctNeutAchiev.concat(incrrectNeutral);
    //если пришло время для финалочек
    if (false) resultStuffs = resultStuffs.concat(correctFinal);
    return resultStuffs.slice(0, necessity);
  }

  checkAnswToGrad = stuff => {
    const nextStage = this.stages.find(
      stage => stage.id === stuff.next_stage_id
    );
    const topic = this._getTopic(nextStage.topic_id);
    return this.checkGrad(topic.graduation);
  };

  //ДОБАВИТЬ БЕЗУСЛОВНЫЕ ОГРАНИЧЕНИЯ ДЛЯ ТЕМ ЗАВИСИМЫХ ОТ АЧИВОК
  getInterfaceStage = id => {
    //ДОБАВИТЬ ПОДКЛЮЧЕНИЕ ФИНАЛОЧЕК КОГДА НАДО

    const stage = this.stages.find(s => s.id === id);
    stage.isBeen = true;

    const stuffs = this._getStuffs(id);

    const replicStuff = stuffs.find(stuff => stuff.isA);
    const replic = new Interf(null, this.getCorrectPhrase(replicStuff.id));

    //ОГРАНИЧЕНИЯ ПО *БЫЛ ТУТ*
    const answersAll = stuffs.filter(stuff => {
      return !stuff.isA;
    });

    //РЕЗУЛЬТАТ
    const resAnswers = answersAll;

    const interf = {
      answers: resAnswers.map(stuff => {
        return new Interf(
          this.getGeneralPhrase(stuff.id),
          this.getCorrectPhrase(stuff.id),
          stuff.id
        );
      }),
      replic
    };

    return interf;
  };

  ssign = data => {
    for (let key in data) {
      if (!["params", "grads", "ranges"].find(k => k === key)) {
        this[key] = data[key];
      }
    }
  };
}
