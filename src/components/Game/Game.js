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
  getSizes() {
    const { width, height } = window.screen;

    const max = Math.max(width, height);
    const min = Math.min(width, height);

    let newWidth = max;

    const factorW = newWidth / this.landWidth;
    let newHeight = this.landHeight * factorW;
    if (newHeight > min) {
      newHeight = min;
      const factorH = newHeight / this.landHeight;
      newWidth = this.landWidth * factorH;
    }
    return { newWidth, newHeight };
  }
  render() {
    const { newWidth, newHeight } = this.getSizes();
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
