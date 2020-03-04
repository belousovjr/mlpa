import React from "react";
import StageItem from "./StageItem";
import AddStage from "./AddStage";

export default class Stages extends React.Component {
  render() {
    const { methods, topic } = this.props;

    const stages = methods.getStages(topic.id);

    const stagesItems = stages.map(stage => (
      <StageItem methods={methods} key={stage.id} stage={stage} />
    ));

    return (
      <div>
        <AddStage methods={methods} topic={topic} />
        {stagesItems}
      </div>
    );
  }
}
