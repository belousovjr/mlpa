import React from "react";
import StuffItem from "../Stuffs/StuffItem";
import RangeItem from "../Ranges/RangeItem";
import AddStuff from "../Stuffs/AddStuff";

export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentRange: "none" };
  }

  click = name => {
    this.setState({ currentRange: name });
  };
  splitStuffs(stuffs) {
    const answer = stuffs.find(stuff => stuff.isA);
    const pAnswers = stuffs.filter(stuff => !stuff.isA);
    return { answer, pAnswers };
  }
  render() {
    const {
      stage,
      methods,
      stat,
      changeStage,
      allStages,
      stuffText,
      topic,
      allTopics
    } = this.props;

    const stuffs = methods.getStuffs(stage.id);

    const { answer, pAnswers } = this.splitStuffs(stuffs);

    const stuffsItems = [answer, ...pAnswers].map(stuff => {
      const res = stuff ? (
        <StuffItem
          stat={stat}
          range={this.state.currentRange}
          methods={methods}
          key={stuff.id}
          stuff={stuff}
          goStage={changeStage}
          allStages={allStages}
          allTopics={allTopics}
          stuffText={stuffText}
        />
      ) : null;

      return res;
    });

    const { ranges } = stat;

    const noRanges = (
      <RangeItem
        isSelect={"none" === this.state.currentRange}
        range={{ name: "none" }}
        click={this.click}
      />
    );

    const rangesItems = ranges.map(range => (
      <RangeItem
        isSelect={range.name === this.state.currentRange}
        key={range.name}
        range={range}
        click={this.click}
      />
    ));

    return (
      <div>
        <h2 align="center">
          {stuffText(stage.id)}{" "}
          <button
            onClick={() => {
              methods.removeStage(stage.id);
            }}
          >
            X
          </button>{" "}
          <input
            type="checkbox"
            checked={stage.isStart}
            onChange={e => {
              methods.updateStage(stage.id, e.target.checked);
            }}
          />
        </h2>
        {noRanges}
        {rangesItems}
        {stuffsItems}
        <AddStuff topic={topic} methods={methods} stageId={stage.id} />
      </div>
    );
  }
}
