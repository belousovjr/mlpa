import React from "react";
import StageItem from "./StageItem";

export default class Stages extends React.Component {
  render() {
    const { stages } = this.props;

    const stagesItems = stages.map(stage => (
      <StageItem key={stage.id} stage={stage} />
    ));

    return <div>{stagesItems}</div>;
  }
}
