import React from "react";
import Stuffs from "../Stuffs/Stuffs";

export default class StageItem extends React.Component {
  render() {
    const { stage, methods } = this.props;

    const pAnswers = methods.getStuffs(stage.id);

    return (
      <div>
        <h2>StageItem {stage.id}</h2>
        <Stuffs stage={stage} stuffs={pAnswers} methods={methods} />
      </div>
    );
  }
}
