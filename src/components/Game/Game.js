import React from "react";
import UI from "./UI";
import Screen from "./Screen";
import locE from "../../game/loc_example";
import mlpaState from "../../mlpa_state";

export default class Game extends React.Component {
  constructor() {
    super();

    this.landWidth = 1920;
    this.landHeight = 1080;

    this.loc = locE;
    this.loc.ssign(mlpaState);
    this.defaultParams();
  }
  defaultParams() {
    this.loc.params.forEach(p => {
      if (!p.isAchiev) p.value = 7;
    });
  }
  render() {
    const { width, height } = window.screen;

    const newWidth = Math.max(width, height);

    const factor = newWidth / this.landWidth;
    const newHeight = this.landHeight * factor;

    return (
      <Screen width={newWidth} height={newHeight}>
        <UI
          loc={this.loc}
          width={newWidth}
          height={newHeight}
          landSizes={{ landWidth: this.landWidth, landHeight: this.landHeight }}
        />
      </Screen>
    );
  }
}
