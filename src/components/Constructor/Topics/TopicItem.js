import React from "react";
import Stages from "../Stages/Stages";

export default class TopicItem extends React.Component {
  render() {
    const { topic } = this.props;
    const { stages } = topic;
    return (
      <div>
        {" "}
        <h1 align="center">Topic {topic.name}</h1>
        <Stages stages={stages} />
      </div>
    );
  }
}
