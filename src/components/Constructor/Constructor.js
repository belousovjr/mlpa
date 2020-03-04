import React from "react";

import { Loc } from "../../mlpa_engine";
import Topics from "./Topics/Topics";
import locE from "./../../game/loc_example";

export default class Constructor extends React.Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.loc = this.getLoc();
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

  render() {
    const { topics, grads } = this.loc;
    console.log(this.loc);
    return (
      <div>
        <h1>Hello, Heh</h1>
        <Topics
          topics={topics}
          grads={grads}
          methods={{
            addTopic: this.addTopic,
            addStage: this.addStage,
            getStages: this.loc._getStages,
            getStuffs: this.loc._getStuffs,
            getPhrases: this.loc._getPhrases
          }}
        />

        <button onClick={() => this.saveLoc()}>save</button>
      </div>
    );
  }
}
