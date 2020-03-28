import Parameter from "./parameter";
import Range from "./range";
import Graduation from "./graduation";
import Phrase from "./phrase";
import Stuff from "./stuff";
import Change from "./change";
import Stage from "./stage";
import Topic from "./topic";
import Interf from "./interf";
import { PARAM_CRUSH } from "../game/parameters";

export default class Loc {
  params = [];
  ranges = [];
  grads = [];
  topics = [];

  stuffs = [];
  stages = [];
  phrases = [];

  lim = 15;

  topicLim = 8;
  topicQ = 0;

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
    let { id: nextStageId, changes = [], isA, isIntro } = props ? props : {};
    const stuffId = this.getId("stuffs");

    this.addPhrases(stuffId, phrases);
    const newStuff = new Stuff(
      nextStageId,
      !isA ? changes.filter(c => c.term) : [],
      isA,
      stuffId
    );
    newStuff.isIntro = isIntro;
    return newStuff;
  }

  addStuffs(stageId, ...stuffs) {
    const newStuffs = stuffs.map(stuff => {
      let { isIntro } = stuff;
      const next_stage_id = isIntro ? stageId : stuff.next_stage_id;
      return { ...stuff, stage_id: stageId, next_stage_id };
    });
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

  checkGrads = gradNames => {
    return gradNames.find(gName => this.checkGrad(gName));
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
  };

  getGeneralPhrase = stuffId => {
    const stuff = this.stuffs.find(s => s.id === stuffId);
    const phrases = this._getPhrases(stuff.id);
    const generalPhrase = phrases.find(phrase => phrase.isGeneral);
    return generalPhrase?.text;
  };

  checkStuffByAchiev = id => {
    const stuff = this.stuffs.find(s => s.id === id);
    if (!stuff.next_stage_id) return false;
    const nextStage = this.stages.find(s => s.id === stuff.next_stage_id);
    const stage = this.stages.find(s => s.id === stuff.stage_id);
    const topic = this._getTopic(stage.topic_id);

    const result = topic.gradNames.find(gName => {
      const grad = this._getGrad(gName);

      return (
        nextStage.isStart &&
        Boolean(
          grad.rangesNames.find(rName => {
            const range = this._getRange(rName);
            const param = this._getParam(range.paramName);
            return param.isAchiev;
          })
        )
      );
    });
    return result;
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

  _getCorrectStuffs = id => {
    const stage = this.stages.find(s => s.id === id);
    stage.isBeen = true;
    const currentTopic = this._getTopic(stage.topic_id);

    const answersAll = this._getStuffs(id);

    const replicStuff = answersAll.find(stuff => stuff.isA);
    const replic = new Interf(null, this.getCorrectPhrase(replicStuff.id));

    let answersNotA = answersAll.filter(stuff => {
      return !(stuff.isA || stuff.isIntro);
    });

    if (!answersNotA.length) {
      this.topicQ++;

      if (this.topicQ < this.topicLim) {
        this.topics.forEach(topic => {
          const nextStage = this._getStages(topic.id).find(
            stage => stage.isStart
          );
          const nextTopic = this._getTopic(nextStage.topic_id);
          if (!nextStage.isBeen && !nextTopic.isStart && !nextTopic.isFin) {
            const nextStuff = this._getStuffs(nextStage.id).find(
              stuff => stuff.isIntro
            );
            answersNotA.push(nextStuff);
          }
        });

        answersNotA = answersNotA.filter(a => {
          if (this.checkStuffByAchiev(a.id)) {
            const nextStage = this.stages.find(s => s.id === a.next_stage_id);
            const nextTopic = this._getTopic(nextStage.topic_id);
            return this.checkGrads(nextTopic.gradNames);
          } else return true;
        });

        answersNotA.sort(() => Math.random() - 0.5);

        answersNotA = answersNotA.slice(0, 3);
      } else if (!currentTopic.isFin) {
        const finalTopic = this.topics.find(topic => {
          return topic.isFin && this.checkGrads(topic.gradNames);
        });
        const finalStage = this._getStages(finalTopic.id).find(s => s.isStart);
        const finalAnswer = this._getStuffs(finalStage.id).find(s => s.isIntro);
        answersNotA.push(finalAnswer);
      }
    }

    return { resAnswers: answersNotA, replic };
  };

  getInterfaceStage = id => {
    const { resAnswers, replic } = this._getCorrectStuffs(id);

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
      if (!["params", "grads", "ranges", "topicLim"].find(k => k === key)) {
        this[key] = data[key];
      }
    }
  };
}
