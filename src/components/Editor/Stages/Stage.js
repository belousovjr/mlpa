import React from "react";
import StuffItem from "../Stuffs/StuffItem";
import RangeItem from "../Ranges/RangeItem";

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
    const { stage, methods, stat } = this.props;

    const stuffs = methods.getStuffs(stage.id);

    const { answer, pAnswers } = this.splitStuffs(stuffs);

    const answerItem = (
      <StuffItem
        stat={stat}
        range={this.state.currentRange}
        methods={methods}
        stuff={answer}
      />
    );

    const stuffsItems = pAnswers.map(stuff => (
      <StuffItem
        stat={stat}
        range={this.state.currentRange}
        methods={methods}
        key={stuff.id}
        stuff={stuff}
      />
    ));

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
        <h2 align="center">Stage {stage.id}</h2>
        {noRanges}
        {rangesItems}
        {answerItem}
        {stuffsItems}
      </div>
    );
  }
}
