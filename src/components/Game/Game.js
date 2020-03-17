import React from "react";
import UI from "./UI";
import Screen from "./Screen";

export default class Game extends React.Component {
  render() {
    const { width, height } = window.screen;

    return (
      <Screen width={width} height={height}>
        <UI width={width} height={height} />
      </Screen>
    );
  }
}
