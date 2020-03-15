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
      pPhrase: "...",
      answers,
      disabled: true,
      currStageId,
      isHiding: false,
      dDelay: 2000
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
    const newStageId = this.loc.calcStuff(stuffId);
    const pPhrase = this.loc.getCorrectPhrase(stuffId);
    const { cPhrase, answers } = this.getStageData(newStageId);

    this.setState({
      isHiding: true
    });

    setTimeout(() => {
      this.setState({
        pPhrase,
        cPhrase,
        currStageId: newStageId,
        answers,
        disabled: true,
        isHiding: false,
        dDelay: 500 //ДОБАВИТЬ ЗАВИСИМОСТЬ ОТ ПОТРЯСЕНИЯ
      });
    }, 500);
  }
  defaultParams() {
    this.loc.params.forEach(p => {
      if (!p.isAchiev) p.value = 7;
    });
  }
  writingFinish() {
    this.setState({ disabled: false });
  }
  render() {
    const {
      pPhrase,
      cPhrase,
      currStageId,
      answers,
      disabled,
      isHiding,
      dDelay
    } = this.state;
    const answersItems = answers.map(answer => {
      return (
        <AnswerI
          key={answer.id}
          text={answer.generalPhrase}
          disabled={disabled}
          click={() => {
            this.update(answer.id);
          }}
        />
      );
    });
    return (
      <div>
        {answersItems}
        <DialogBox
          hiding={isHiding}
          key={currStageId}
          pPhrase={pPhrase}
          cPhrase={cPhrase}
          dDelay={dDelay}
          writingFinish={() => {
            this.writingFinish();
          }}
        />
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
