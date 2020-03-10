import React from "react";
import { Loc } from "../../mlpa_engine";
import mlpaState from "../../mlpa_state";
import ReplicI from "./ReplicI/ReplicI";
import AnswerI from "./AnswerI/AnswerI";

export default class UI extends React.Component {
  constructor() {
    super();
    this.loc = new Loc();
    this.loc.ssign(mlpaState);
    const currentStage = this.loc.getStartId();
    this.state = {
      currentStage
    };
  }

  updateStage(stuffId) {
    const newStageId = this.loc.calcStuff(stuffId);
    this.setState({ currentStage: newStageId });
  }

  render() {
    const { currentStage } = this.state;
    const currentInterface = this.loc.getInterfaceStage(currentStage);

    const { answers, replic } = currentInterface;
    const answersItems = answers.map(answer => {
      return (
        <AnswerI
          key={answer.id}
          answer={answer}
          updateStage={() => {
            this.updateStage(answer.id);
          }}
        />
      );
    });

    return (
      <div>
        <ReplicI replic={replic} />
        {answersItems}
      </div>
    );
  }
}
