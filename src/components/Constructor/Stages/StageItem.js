import React from "react";
import Stuffs from "../Stuffs/Stuffs";

export default class StageItem extends React.Component {
  render() {
    const { stage } = this.props;
    const { pAnswers } = stage;
    return (
      <div>
        <h2>StageItem {stage.id}</h2>
        <Stuffs stuffs={pAnswers} />
      </div>
    );
  }
}
