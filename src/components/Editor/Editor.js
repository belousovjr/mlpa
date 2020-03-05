import React from "react";

import { Loc } from "../../mlpa_engine";
import locE from "./../../game/loc_example";
import TopicItem from "./Topics/TopicItem";
import Topic from "./Topics/Topic";

export default class Editor extends React.Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.loc = this.getLoc();
    this.state = { currentTopic: this.loc.topics[0].id };
  }

  getLoc() {
    const loc = new Loc();
    const data = JSON.parse(this.myStorage.getItem("locData"));
    loc.ssign(data);
    return loc ? loc : locE;
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
    this.loc.addStages(topicId, this.loc.cStage());
    this.forceUpdate();
  };
  updateGrad = (topicId, gradName) => {
    this.loc._updateGrad(topicId, gradName);
    this.forceUpdate();
  };
  click = id => {
    this.setState({ currentTopic: id });
  };

  render() {
    const { topics, grads, params, ranges } = this.loc;
    const stat = {
      grads,
      params,
      ranges
    };

    const methods = {
      addTopic: this.addTopic,
      addStage: this.addStage,
      updateGrad: this.updateGrad,
      getStages: this.loc._getStages,
      getStuffs: this.loc._getStuffs,
      getPhrases: this.loc._getPhrases
      /*  addStuffs: this.loc.addStuffs,
            addPhrases: this.loc.addPhrases,*/
    };

    const topicItems = topics.map(topic => {
      const isSelect = topic.id === this.state.currentTopic;
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

    console.log(this.loc);
    return (
      <div>
        <button onClick={() => this.saveLoc()}>save</button>
        <br />
        {topicItems}
        <Topic
          topic={topics.find(topic => topic.id === this.state.currentTopic)}
          stat={stat}
          methods={methods}
        />
      </div>
    );
  }
}
