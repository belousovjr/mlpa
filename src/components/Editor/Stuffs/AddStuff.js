import React from "react";

export default class AddStuff extends React.Component {
  render() {
    const { methods, stageId, topic } = this.props;

    const nextStageId = methods.getStages(topic.id)[0].id;

    return (
      <div>
        <button
          onClick={() => {
            methods.addStuff(stageId, false, nextStageId, []);
          }}
        >
          +
        </button>
      </div>
    );
  }
}
