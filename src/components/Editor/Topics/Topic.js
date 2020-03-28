import React from "react";
import StageItem from "../Stages/StageItem";
import Stage from "../Stages/Stage";

export default class Topic extends React.Component {
  constructor() {
    super();
    this.state = { newStageStart: false, showGrads: false };
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

    const { showGrads } = this.state;

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
                topic.gradNames,
                topic.isFin,
                topic.isStart
              );
            }}
          />
          , grads:
          <input type="checkbox" checked={showGrads} onChange={e => {this.setState({showGrads: e.target.checked})}}/>
          {showGrads
            ? stat.grads.map(g => (
                <div key={g.name}>
                  {g.name}
                  <input
                    type="checkbox"
                    checked={Boolean(
                      topic.gradNames.find(grad => grad === g.name)
                    )}
                    onChange={e => {
                      methods.updateTopicGrads(
                        topic.id,
                        g.name,
                        !e.target.checked
                      );
                    }}
                  />
                </div>
              ))
            : null}
          Start:
          <input
            type="checkbox"
            checked={topic.isStart}
            onChange={e => {
              methods.updateTopic(
                topic.id,
                topic.name,
                topic.gradNames,
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
                topic.gradNames,
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
