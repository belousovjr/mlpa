import React from "react";
import StageItem from "../Stages/StageItem";
import Stage from "../Stages/Stage";

export default class Topic extends React.Component {
  constructor() {
    super();
    this.state = { newStageStart: false };
  }
  stuffText = id => {
    if (id) {
      const { methods } = this.props;

      const nextStuff = methods.getStuffs(id).find(stuff => stuff.isA);

      if (nextStuff) {
        const nextPhrases = methods.getPhrases(nextStuff.id);
        const nextPhrase = nextPhrases.find(p => !p.rangeName);

        if (nextPhrase) {
          return `(${id}) ${nextPhrase.text.slice(0, 7)}...`;
        } else return `(${id}) NOT PHRASE...`;
      } else return "NOT FOUND";
    }
    return null;
  };
  render() {
    const {
      topic,
      stat,
      methods,
      currentStage,
      click,
      changeStage,
      allStages,
      allTopics
    } = this.props;

    const { grads } = stat;
    const { graduation } = topic;

    const stages = methods.getStages(topic.id);
    const stagesItems = stages.map(stage => {
      const isSelect = stage.id === currentStage;

      return (
        <StageItem
          methods={methods}
          stuffText={this.stuffText}
          key={stage.id}
          stage={stage}
          isSelect={isSelect}
          click={click}
        />
      );
    });

    const optItems = grads.map(grad => {
      return (
        <option value={grad.name} key={grad.name}>
          {grad.name}
        </option>
      );
    });

    const curStage = stages.find(stage => stage.id === currentStage);

    const stageView = currentStage ? (
      <Stage
        stage={curStage}
        methods={methods}
        stat={stat}
        allStages={allStages}
        allTopics={allTopics}
        changeStage={changeStage}
        stuffText={this.stuffText}
        topic={topic}
      />
    ) : null;

    return (
      <div>
        <h1 align="center">
          Topic{" "}
          <input
            value={topic.name}
            onChange={e => {
              methods.updateTopic(
                topic.id,
                e.target.value,
                topic.graduation,
                topic.isFin,
                topic.isStart
              );
            }}
          />
          , grad:
          <select
            value={graduation}
            onChange={e => {
              methods.updateTopic(
                topic.id,
                topic.name,
                e.target.value,
                topic.isFin,
                topic.isStart
              );
            }}
          >
            {optItems}
          </select>
          Start:
          <input
            type="checkbox"
            checked={topic.isStart}
            onChange={e => {
              methods.updateTopic(
                topic.id,
                topic.name,
                topic.graduation,
                topic.isFin,
                e.target.checked
              );
            }}
          />
          Final:
          <input
            type="checkbox"
            checked={topic.isFin}
            onChange={e => {
              methods.updateTopic(
                topic.id,
                topic.name,
                topic.graduation,
                e.target.checked,
                topic.isStart
              );
            }}
          />
          <button
            onClick={() => {
              methods.removeTopic(topic.id);
            }}
            style={{ marginLeft: "1rem" }}
          >
            X
          </button>
        </h1>

        <br />
        <div>
          <input
            type="checkbox"
            checked={this.state.newStageStart}
            onChange={e => {
              this.setState({ newStageStart: e.target.checked });
            }}
          />
          <button
            onClick={() => {
              methods.addStage(topic.id, this.state.newStageStart);
            }}
          >
            +
          </button>
        </div>
        {stagesItems}
        <br />
        {stageView}
      </div>
    );
  }
}
