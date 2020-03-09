import React from "react";

import { Loc } from "../../mlpa_engine";
import locE from "./../../game/loc_example";
import TopicItem from "./Topics/TopicItem";
import Topic from "./Topics/Topic";
import AddTopic from "./Topics/AddTopic"

export default class Editor extends React.Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.loc = this.getLoc();
    const {topicId, stageId} = this.getTopStag()
    this.state = { currentTopic: topicId, currentStage: stageId };
  }

  getTopStag(){
    const topicId = this.loc.topics[0] ? this.loc.topics[0].id : null
    const stageId = this.loc._getStages(topicId)[0]  ? this.loc._getStages(topicId)[0].id : null
    return {topicId, stageId}
  }

  getLoc() {
    const loc = new Loc();
    const data = JSON.parse(this.myStorage.getItem("locData"));
    loc.ssign(data);
    return data ? loc : locE;
  }

  saveLoc() {
    const locData = JSON.stringify(this.loc);
    this.myStorage.setItem("locData", locData);
  }

  addTopic = (name, gradName) => {
    this.loc.cTopic(name, gradName);
    this.forceUpdate();
  };

  addStage = topicId => {
    console.log(topicId)
    this.loc.addStages(topicId, this.loc.cStage());
    this.forceUpdate();
  };
  updateTopic = (topicId, name, gradName) => {
    const topic = this.loc._getTopic(topicId)
    topic.name = name
    topic.graduation = gradName
    this.forceUpdate();
  };


  removeTopic = (id) => {
    const index = this.loc.topics.findIndex(t => t.id === id)
    this.loc.topics.splice(index, 1)
    const stages = this.loc._getStages(id)
    stages.forEach(s => {this.removeStage(s.id)})
    
    this.setState({currentTopic: null, currentStage: null})
    this.forceUpdate();
  }
  removeStage = (id) => {
    const index = this.loc.stages.findIndex(s => s.id === id)
    this.loc.stages.splice(index, 1)
    const stuffs = this.loc._getStuffs(id)
    stuffs.forEach(s => {
      if(s.next_stage_id === id){
        s.next_stage_id = null
      }
      this.removeStuff(s.id)})
    this.setState({currentStage: null})
    this.forceUpdate();
  }
  removeStuff = (id) => {
    const index = this.loc.stuffs.findIndex(s => s.id === id)
    this.loc.stuffs.splice(index, 1)
    const phrases = this.loc._getPhrases(id)
    phrases.forEach(p => {this.removePhrase(p.id)})
    this.forceUpdate();
  }
  removePhrase = (id) => {
    const index = this.loc.phrases.findIndex(p => p.id === id)
    this.loc.phrases.splice(index, 1)
    this.forceUpdate();
  }

  click = id => {
    const firstStage = this.loc._getStages(id)[0]
    if(firstStage)this.changeStage(firstStage.id)
      else this.setState({ currentTopic: id, currentStage: null});
    this.forceUpdate();
  };
  changeStage = id => {
     const stage = this.loc.stages.find(s => s.id === id)
     if(stage){
     this.setState({ currentTopic: stage.topic_id, currentStage: id });
     }
      this.forceUpdate();
  }

  render() {
    const { topics, grads, params, ranges } = this.loc;
    const stat = {
      grads,
      params,
      ranges
    };

    const { currentStage, currentTopic} = this.state

    const methods = {
      addTopic: this.addTopic,
      addStage: this.addStage,
      updateTopic: this.updateTopic,
      removeTopic: this.removeTopic,
      removeStage: this.removeStage,
      removeStuff: this.removeStuff,
      removePhrase: this.removePhrase,
      getStages: this.loc._getStages,
      getStuffs: this.loc._getStuffs,
      getPhrases: this.loc._getPhrases,

      /*  addStuffs: this.loc.addStuffs,
            addPhrases: this.loc.addPhrases,*/
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

    const topicView = currentTopic ? <Topic
    allStages={this.loc.stages}
        currentStage={currentStage}
          topic={topics.find(topic => topic.id === this.state.currentTopic)}
          stat={stat}
          methods={methods}
          goTopic={this.click}
          click={this.changeStage}
          changeStage={this.changeStage}
        /> : null

    console.log(this.loc);
    return (
      <div>
      {currentStage}
        <button onClick={() => this.saveLoc()}>save</button>
        <br />
        <AddTopic methods={methods} stat={stat} />{topicItems}
      {topicView}
      </div>
    );
  }
}
