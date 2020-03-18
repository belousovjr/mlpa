import React from "react";

import Params from "./Params";
import AnswerI from "./AnswerI/AnswerI";
import DialogBox from "./DialogBox/DialogBox";
import "./style.css";
import Visual from "./Visual/Visual";
import Loading from "./Loading/Loading";

export default class UI extends React.Component {
  constructor(props) {
    super(props);

    this.loc = props.loc;
    const currStageId = this.loc.getStartId();
    const { cPhrase, answers } = this.getStageData(currStageId);
    this.state = {
      cPhrase,
      pPhrase: "О чем ты сейчас думаешь?",
      answers,
      disabled: true,
      currStageId,
      isHiding: false,
      dDelay: 2000,
      isLoaded: false
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
      isHiding: true,
      disabled: true
    });

    setTimeout(() => {
      this.setState({
        pPhrase,
        cPhrase,
        currStageId: newStageId,
        answers,
        isHiding: false,
        dDelay: 500 //ДОБАВИТЬ ЗАВИСИМОСТЬ ОТ ПОТРЯСЕНИЯ
      });
    }, 500);
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
      dDelay,
      isLoaded
    } = this.state;
    const answersItems = answers.map(answer => {
      return (
        <AnswerI
          key={answer.id}
          text={answer.generalPhrase}
          disabled={disabled}
          isHiding={isHiding}
          click={() => {
            this.update(answer.id);
          }}
        />
      );
    });

    const { width, height, landSizes } = this.props;

    const gameUI = isLoaded ? (
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
        <div className="answers">{answersItems}</div>
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
    ) : null;

    const loadingAnim = !isLoaded ? <Loading /> : null;

    return (
      <div>
        <Visual
            params={this.loc.params}
          width={width}
          height={height}
          isLoaded={isLoaded}
          loadFinished={() => this.setState({ isLoaded: true })}
          landSizes={landSizes}
        />
        {gameUI}

        {loadingAnim}
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
