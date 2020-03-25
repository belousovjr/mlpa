import React from "react";

import Params from "./Params";
import AnswerI from "./AnswerI/AnswerI";
import DialogBox from "./DialogBox/DialogBox";
import "./style.css";
import Visual from "./Visual/Visual";
import Loading from "./Loading/Loading";
import AudioPlayer from "./Audio/AudioPlayer";
import Settings from "./Settings/Settiings";
import Ending from "./Ending/Ending";

export default class UI extends React.Component {
  constructor(props) {
    super(props);

    this.loc = props.loc;
    const currStageId = this.loc.getStartId();
    const { cPhrase, answers } = this.getStageData(currStageId);
    this.state = {
      cPhrase,
      pPhrase: "Шевелись уже, убожество.",
      answers,
      disabled: true,
      currStageId,
      isHiding: false,
      dDelay: 2000,
      isLoaded: false,
      audioPlayed: false,
      isEnding: false
    };
  }
  getStageData(stageId) {
    const interf = this.loc.getInterfaceStage(stageId);
    const { answers, replic } = interf;
    const { phrase } = replic;

    const newStage = this.loc.stages.find(stage => stage.id === stageId);
    const topic = this.loc._getTopic(newStage.topic_id);
    const { isFin } = topic;

    return {
      cPhrase: phrase,
      answers,
      isFin
    };
  }
  update(stuffId) {
    const newStageId = this.loc.calcStuff(stuffId);
    const pPhrase = this.loc.getCorrectPhrase(stuffId);
    const { cPhrase, answers, isFin } = this.getStageData(newStageId);
    // const newTopic = this.loc._getTopic(topic_id)

    this.setState({
      isHiding: true,
      disabled: true
    });

    setTimeout(() => {
      this.setState({
        isEnding: isFin,
        pPhrase,
        cPhrase,
        currStageId: newStageId,
        answers,
        isHiding: false,
        dDelay: 500 //ДОБАВИТЬ ЗАВИСИМОСТЬ ОТ ПОТРЯСЕНИЯ
      });
    }, 500);
  }
  endingNext = () => {
    const { answers } = this.state;
    if (answers.length) this.update(answers[0].id);
  };
  writingFinish() {
    this.setState({ disabled: false });
  }
  audioSwitch = () => {
    const { audioPlayed } = this.state;
    this.setState({ audioPlayed: !audioPlayed });
  };
  render() {
    const {
        pPhrase,
        cPhrase,
        currStageId,
        answers,
        disabled,
        isHiding,
        dDelay,
        isLoaded,
        audioPlayed,
        isEnding
      } = this.state,
      answersItems = answers.map(answer => {
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
      }),
      { width, height, landSizes } = this.props,
      gameUI =
        isLoaded && !isEnding ? (
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
          </div>
        ) : null,
      loadingAnim = !isLoaded ? <Loading /> : null;

    return (
      <div>
        {loadingAnim}
        <Visual
          isEnding={isEnding}
          params={this.loc.params}
          width={width}
          height={height}
          isLoaded={isLoaded}
          loadFinished={() => this.setState({ isLoaded: true })}
          landSizes={landSizes}
        />
        <Ending
          isEnding={isEnding}
          disabled={disabled}
          endingNext={this.endingNext}
        />
        <AudioPlayer
          ranges={this.loc.ranges}
          checkRange={this.loc.checkRange}
          audioPlayed={audioPlayed}
        />
        {gameUI}
        <DialogBox
          isLoaded={isLoaded}
          hiding={isHiding}
          key={currStageId}
          pPhrase={pPhrase}
          cPhrase={cPhrase}
          dDelay={dDelay}
          isEnding={isEnding}
          writingFinish={() => {
            this.writingFinish();
          }}
        />

        <Settings
          methods={{ audioSwitch: this.audioSwitch }}
          data={{ audioPlayed }}
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
