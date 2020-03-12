import React from "react";

import locE from "../../game/loc_example";
//import locE from "./../../game/loc_example";
import TopicItem from "./Topics/TopicItem";
import Topic from "./Topics/Topic";
import AddTopic from "./Topics/AddTopic";
import exportFromJSON from "export-from-json";
import mlpaState from "../../mlpa_state";

export default class Editor extends React.Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.loc = {};
    this.import(true);
    const { topicId, stageId } = this.getTopStag();
    this.state = { currentTopic: topicId, currentStage: stageId };
  }

  import(firstTime) {
    this.loc = locE;

    this.loc.ssign({ ...mlpaState });
    if (!firstTime) this.forceUpdate();
  }

  getTopStag() {
    const topicId = this.loc.topics[0] ? this.loc.topics[0].id : null;
    const stageId = this.loc._getStages(topicId)[0]
      ? this.loc._getStages(topicId)[0].id
      : null;
    return { topicId, stageId };
  }

  exportFile() {
    const data = this.loc;
    const fileName = "mlpa_state";
    const exportType = "json";

    exportFromJSON({ data, fileName, exportType });
  }

  saveLoc() {
    const locData = JSON.stringify(this.loc);
    this.myStorage.setItem("locData", locData);
  }

  addTopic = (name, gradName, isFin, isStart) => {
    this.loc.cTopic(name, gradName, isFin, isStart);
    this.forceUpdate();
  };

  addStage = (topicId, isStart) => {
    this.loc.addStages(
      topicId,
      this.loc.cStage(
        isStart,
        this.loc.cStuff({ isA: true }, this.loc.cPhrase("space"))
      )
    );
    this.forceUpdate();
  };
  updateStage = (id, isStart) => {
    const stage = this.loc.stages.find(s => s.id === id);
    stage.isStart = isStart;
    this.forceUpdate();
  };
  updateTopic = (topicId, name, gradName, isFin, isStart) => {
    const topic = this.loc._getTopic(topicId);
    topic.name = name;
    topic.graduation = gradName;
    topic.isFin = isFin;
    topic.isStart = isStart;
    this.forceUpdate();
  };
  addPhrase = (stuffId, range, text, isGeneral) => {
    this.loc.addPhrases(stuffId, [this.loc.cPhrase(text, isGeneral, range)]);
    this.forceUpdate();
  };

  updatePhrase = (stuffId, range, id, newText) => {
    const phrase = this.loc.phrases.find(p => p.id === id);
    if (phrase) {
      phrase.text = newText;
      if (!newText && !phrase.isGeneral && phrase.rangeName)
        this.removePhrase(phrase.id);
    } else {
      this.addPhrase(stuffId, range, newText);
    }
    this.forceUpdate();
  };

  addStuff = (stageId, isA, nextStageId, changes = []) => {
    const newStaff = this.loc.cStuff(
      {
        isA,
        id: nextStageId
      },
      this.loc.cPhrase("space"),
      this.loc.cPhrase("generalSpace", true)
    );

    this.loc.addStuffs(stageId, newStaff);

    this.forceUpdate();
  };
  updateStuff = (id, nextStageId, ...changes) => {
    const stuff = this.loc.stuffs.find(s => s.id === id);
    stuff.next_stage_id = nextStageId;
    changes.forEach(change => {
      const changeIndex = stuff.changes.findIndex(
        c => c.paramName === change.paramName
      );
      const thisStuffCh = stuff.changes[changeIndex];

      const changeTerm = change.term;

      if (!thisStuffCh) {
        stuff.changes.push(this.loc.cChange(change.paramName, changeTerm));
      } else {
        if (changeTerm) thisStuffCh.term = changeTerm;
        else stuff.changes.splice(changeIndex, 1);
        console.log(thisStuffCh);
      }
    });
    this.forceUpdate();
  };

  removeTopic = id => {
    const index = this.loc.topics.findIndex(t => t.id === id);
    this.loc.topics.splice(index, 1);
    const stages = this.loc._getStages(id);
    stages.forEach(s => {
      this.removeStage(s.id);
    });

    this.setState({ currentTopic: null, currentStage: null });
    this.forceUpdate();
  };
  removeStage = id => {
    const index = this.loc.stages.findIndex(s => s.id === id);
    this.loc.stages.splice(index, 1);
    const stuffs = this.loc._getStuffs(id);
    stuffs.forEach(s => {
      if (s.next_stage_id === id) {
        s.next_stage_id = null;
      }
      this.removeStuff(s.id);
    });
    this.setState({ currentStage: null });
    this.forceUpdate();
  };
  removeStuff = id => {
    const index = this.loc.stuffs.findIndex(s => s.id === id);
    this.loc.stuffs.splice(index, 1);
    const phrases = this.loc._getPhrases(id);
    phrases.forEach(p => {
      this.removePhrase(p.id);
    });
    this.forceUpdate();
  };
  removePhrase = id => {
    const index = this.loc.phrases.findIndex(p => p.id === id);
    this.loc.phrases.splice(index, 1);
    this.forceUpdate();
  };

  click = id => {
    const firstStage = this.loc._getStages(id)[0];
    if (firstStage) this.changeStage(firstStage.id);
    else this.setState({ currentTopic: id, currentStage: null });
    this.forceUpdate();
  };
  changeStage = id => {
    const stage = this.loc.stages.find(s => s.id === id);
    if (stage) {
      this.setState({ currentTopic: stage.topic_id, currentStage: id });
    }

    this.forceUpdate();
  };

  render() {
    const { topics, grads, params, ranges } = this.loc;
    const stat = {
      grads,
      params,
      ranges
    };

    const { currentStage, currentTopic } = this.state;

    const methods = {
      addTopic: this.addTopic,
      addStage: this.addStage,
      updateStage: this.updateStage,
      updateTopic: this.updateTopic,
      removeTopic: this.removeTopic,
      removeStage: this.removeStage,
      updateStuff: this.updateStuff,
      removeStuff: this.removeStuff,
      getStages: this.loc._getStages,
      getStuffs: this.loc._getStuffs,
      getPhrases: this.loc._getPhrases,
      addStuff: this.addStuff,
      updatePhrase: this.updatePhrase,
      addPhrase: this.addPhrase,
      removePhrase: this.removePhrase,
      getParam: this.loc._getParam,
      checkStageFinal: this.loc.checkStageFinal
    };

    const topicItems = topics.map(topic => {
      const isSelect = topic.id === currentTopic;
      return (
        <TopicItem
          key={topic.id}
          topic={topic}
          methods={methods}
          isSelect={isSelect}
          click={this.click}
        />
      );
    });

    const topicView = currentTopic ? (
      <Topic
        allTopics={this.loc.topics}
        allStages={this.loc.stages}
        currentStage={currentStage}
        topic={topics.find(topic => topic.id === this.state.currentTopic)}
        stat={stat}
        methods={methods}
        goTopic={this.click}
        click={this.changeStage}
        changeStage={this.changeStage}
      />
    ) : null;

    console.log(this.loc);
    return (
      <div>
        <button onClick={() => this.import()}>import</button>
        <button onClick={() => this.exportFile()}>export</button>
        <br />
        <AddTopic methods={methods} stat={stat} />
        {topicItems}
        {topicView}
      </div>
    );
  }
}
