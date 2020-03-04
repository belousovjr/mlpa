import React from "react";

export default class AddStage extends React.Component {
  render() {
    const { methods, topic } = this.props;

    return (
      <div>
        <button onClick={() => methods.addStage(topic.id)}>add stage</button>
      </div>
    );
  }
}
