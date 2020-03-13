import React from "react";
import locE from "../../game/loc_example";
import mlpaState from "../../mlpa_state";
import ReplicI from "./ReplicI/ReplicI";
import AnswerI from "./AnswerI/AnswerI";
import Params from "./Params";

export default class UI extends React.Component {
  constructor() {
    super();
    this.loc = locE;
    this.loc.ssign(mlpaState);
    this.defaultParams();
    const currentStage = this.loc.getStartId();
    this.state = {
      currentStage,
      prevAnswer: "Что с тобой?"
    };
  }

  defaultParams() {
    this.loc.params.forEach(p => {
      if (!p.isAchiev) p.value = 7;
    });
  }

  updateStage(stuffId) {
    const newStageId = this.loc.calcStuff(stuffId);
    const newPrevAnswer = this.loc.getCorrectPhrase(stuffId);
    this.setState({ currentStage: newStageId, prevAnswer: newPrevAnswer });
  }

  render() {
    const { currentStage, prevAnswer } = this.state;
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
        <Params
          params={this.loc.params}
          lim={this.loc.lim}
          edit={(paramName, term) => {
            this.loc._editParams([this.loc.cChange(paramName, term)]);
            this.forceUpdate();
          }}
          grads={this.loc.grads}
          checkGrad={this.loc.checkGrad}
        />
        <ReplicI replic={{ phrase: prevAnswer }} isPlayerReplic={true} />
        <ReplicI replic={replic} />
        {answersItems}
      </div>
    );
  }
}
