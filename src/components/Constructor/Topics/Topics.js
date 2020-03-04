import React from "react";
import TopicItem from "./TopicItem";
import AddTopic from "./AddTopic";

export default class Topics extends React.Component {
  render() {
    const { topics, grads, methods } = this.props;
    const topicsItems = topics.map(topic => {
      return <TopicItem topic={topic} key={topic.name} methods={methods} />;
    });

    return (
      <div>
        <AddTopic grads={grads} methods={methods} />
        {topicsItems}
      </div>
    );
  }
}
