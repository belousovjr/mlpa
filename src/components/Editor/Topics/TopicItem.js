import React from "react";

export default class TopicItem extends React.Component {
  render() {
    const { topic, isSelect, click } = this.props;

    const border = topic.isStart
      ? "solid 0.3rem red"
      : topic.isFin
      ? "solid 0.3rem aqua"
      : "none";

    const style = {
      backgroundColor: isSelect ? "green" : "gray",
      display: "inline-block",
      margin: "0.2rem",
      padding: "0.5rem",
      cursor: "pointer",
      color: "white",
      border
    };
    return (
      <div
        style={style}
        onClick={() => {
          click(topic.id);
        }}
      >
        {topic.name}
      </div>
    );
  }
}
