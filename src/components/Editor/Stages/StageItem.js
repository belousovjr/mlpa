import React from "react";

export default class StageItem extends React.Component {
  render() {
    const { stage, click, isSelect, stuffText, methods } = this.props;

    const isFinal = methods.checkStageFinal(stage.id);
    const border = stage.isStart
      ? "solid 0.3rem red"
      : isFinal
      ? "solid 0.3rem aqua"
      : "none";

    const style = {
      backgroundColor: isSelect ? "blue" : "gray",
      cursor: "pointer",
      display: "inline-block",
      margin: "0.2rem",
      padding: "0.5rem",
      color: "white",
      border
    };
    return (
      <div
        onClick={() => {
          click(stage.id);
        }}
        style={style}
      >
        {stuffText(stage.id)}
      </div>
    );
  }
}
