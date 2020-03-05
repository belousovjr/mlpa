import React from "react";

export default class TopicItem extends React.Component {
  render() {
    const { topic, isSelect, click } = this.props;

    const style = {
      backgroundColor: isSelect ? "green" : "gray",
      display: "inline-block",
      margin: "0.2rem",
      padding: "0.5rem",
      cursor: "pointer",
        color: 'white'
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
