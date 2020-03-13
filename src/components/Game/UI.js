import React from "react";
import locE from "../../game/loc_example";
import mlpaState from "../../mlpa_state";

import Params from "./Params";
import AnswerI from "./AnswerI/AnswerI";
import DialogBox from "./DialogBox/DialogBox";

export default class UI extends React.Component {
  constructor() {
    super();
    this.loc = locE;
    this.loc.ssign(mlpaState);
    this.defaultParams();

    const currStageId = this.loc.getStartId();
    const { cPhrase, answers } = this.getStageData(currStageId);
    this.state = {
      cPhrase,
      pPhrase: "Что с тобой?",
      answers,
      disabled: true,
      currStageId
    };
  }
  getStageData(stageId) {
    const interf = this.loc.getInterfaceStage(stageId);
    const { answers, replic } = interf;
    const { phrase } = replic;

    return {
      cPhrase: phrase,
      answers
    };
  }
  update(stuffId) {
    //ответ игрока
    //ответ персонажа
    //варианты
    //текущий stage
    const newStageId = this.loc.calcStuff(stuffId);
    const pPhrase = this.loc.getCorrectPhrase(stuffId);
    const { cPhrase, answers } = this.getStageData(newStageId);

    this.setState({
      pPhrase,
      cPhrase,
      currStageId: newStageId,
      answers
    });
  }
  defaultParams() {
    this.loc.params.forEach(p => {
      if (!p.isAchiev) p.value = 7;
    });
  }
  render() {
    const { pPhrase, cPhrase, currStageId, answers } = this.state;
    const answersItems = answers.map(answer => {
      return (
        <AnswerI
          key={answer.id}
          text={answer.generalPhrase}
          click={() => {
            this.update(answer.id);
          }}
        />
      );
    });
    return (
      <div>
        {answersItems}
        <DialogBox key={currStageId} pPhrase={pPhrase} cPhrase={cPhrase} />
      </div>
    );
  }
}

/*
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
*/
