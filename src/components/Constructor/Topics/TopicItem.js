import React from "react";
import Stages from "../Stages/Stages";

export default class TopicItem extends React.Component {
  render() {
    const { topic, methods } = this.props;
    const stages = methods.getStages(topic.id);

    return (
      <div>
        <h1 align="center">
          Topic {topic.name} {topic.id}
        </h1>
        <Stages topic={topic} stages={stages} methods={methods} />
      </div>
    );
  }
}
