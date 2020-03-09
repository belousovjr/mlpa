import React from "react";

export default class StageItem extends React.Component {
  render() {
    const { stage, click, isSelect, stuffText } = this.props;

    const style = {
      backgroundColor: isSelect ? "blue" : "gray",
      cursor: "pointer",
      display: "inline-block",
      margin: "0.2rem",
      padding: "0.5rem",
      color: "white"
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
