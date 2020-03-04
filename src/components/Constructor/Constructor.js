import React from "react";

import { Loc } from "../../mlpa_engine";
import Topics from "./Topics/Topics";
import locE from "./../../game/loc_example";

export default class Constructor extends React.Component {
  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.loc = this.getLoc();
    console.log(this.loc);
  }

  getLoc() {
    const loc = Object.assign(
      new Loc(),
      JSON.parse(this.myStorage.getItem("locData"))
    );
    return loc || locE;
  }

  saveLoc() {
    this.myStorage.setItem("locData", JSON.stringify(this.loc));
  }

  render() {
    const { topics } = this.loc;

    return (
      <div>
        <h1>Hello, Heh</h1>
        <Topics topics={topics} />

        <button onClick={() => this.saveLoc()}>save</button>
      </div>
    );
  }
}
