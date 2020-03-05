import React from "react";
import StageItem from "../Stages/StageItem";
import Stage from "../Stages/Stage";

export default class Topic extends React.Component {
  constructor(props) {
    super(props);
    const currentStage = props.methods.getStages(props.topic.id)[0].id;
    this.state = { currentStage };
  }
  click = id => {
    this.setState({ currentStage: id });
  };
  render() {
    const { topic, stat, methods } = this.props;

    const { grads } = stat;
    const { graduation } = topic;

    const stages = methods.getStages(topic.id);
    const stagesItems = stages.map(stage => {
      const isSelect = stage.id === this.state.currentStage;

      return (
        <StageItem
          key={stage.id}
          stage={stage}
          isSelect={isSelect}
          click={this.click}
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

    return (
      <div>
        <h1 align="center">
          Topic "{topic.name}", grad:
          <select
            value={graduation}
            onChange={e => {
              methods.updateGrad(topic.id, e.target.value);
            }}
          >
            {optItems}
          </select>
        </h1>

        <br />
        {stagesItems}
        <br />
        <Stage
          stage={stages.find(stage => stage.id === this.state.currentStage)}
          methods={methods}
          stat={stat}
        />
      </div>
    );
  }
}
