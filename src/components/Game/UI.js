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
import { PARAM_DETERMINATION } from "../../game/parameters";
import Alert from "./Alert/Alert";

export default class UI extends React.Component {
  constructor(props) {
    super(props);

    this.loc = props.loc;
    const currStageId = this.loc.getStartId();
    const currentStuff = this.loc._getStuffs(currStageId).find(s => s.isIntro);
    const { text: pPhrase } = this.loc
      ._getPhrases(currentStuff.id)
      .find(p => !p.isGeneral);

    const { cPhrase, answers } = this.getStageData(currStageId);
    this.state = {
      cPhrase,
      pPhrase,
      answers,
      disabled: true,
      currStageId,
      isHiding: false,
      dDelay: 1000,
      isLoaded: false,
      audioPlayed: false,
      isEnding: false,
      alertText: ""
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
    const stuff = this.loc.stuffs.find(s => s.id === stuffId);
    stuff.changes.forEach(change => {
      const param = this.loc._getParam(change.paramName);
      if (param.isAchiev && param.value !== change.term) {
        setTimeout(() => {
          this.setState({
            alertText: param.name
          });
        }, 500);
      }
    });

    const newStageId = stuff.next_stage_id;

    const pPhrase = this.loc.getCorrectPhrase(stuffId);
    const { cPhrase, answers, isFin } = this.getStageData(newStageId);

    this.loc.calcStuff(stuffId);

    this.setState({
      isHiding: true,
      disabled: true
    });

    setTimeout(() => {
      const delayParam = this.loc._getParam(PARAM_DETERMINATION);
      const dDelay = (this.loc.lim - delayParam.value) * 100;
      this.setState({
        isEnding: isFin,
        pPhrase,
        cPhrase,
        currStageId: newStageId,
        answers,
        isHiding: false,
        dDelay
      });
    }, 500);
  }
  endingNext = () => {
    const { answers } = this.state;
    if (answers.length) this.update(answers[0].id);
    //console.log(answers.length)
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
      isEnding,
      alertText
    } = this.state;

    const answersItems = answers.map(answer => {
        const isAchiev = this.loc.checkStuffByAchiev(answer.id);

        return (
          <AnswerI
            isAchiev={isAchiev}
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
      { width, height, landSizes } = this.props;

    const currentStage = this.loc.stages.find(s => s.id === currStageId);
    const currentTopic = this.loc._getTopic(currentStage.topic_id);

    const gameUI =
      isLoaded && !isEnding ? (
        <div className="answers">{answersItems}</div>
      ) : null;
    const loadingAnim = !isLoaded ? <Loading /> : null;

    return (
      <div>
        {loadingAnim}
        <Visual
          progress={(this.loc.topicQ / this.loc.topicLim) * 1000}
          isEnding={isEnding}
          params={this.loc.params}
          width={width}
          height={height}
          isLoaded={isLoaded}
          loadFinished={() => this.setState({ isLoaded: true })}
          landSizes={landSizes}
        />
        <Ending
          topicName={currentTopic.name}
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
        <Alert key={alertText} text={alertText} />
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
