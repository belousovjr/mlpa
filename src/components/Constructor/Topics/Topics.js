import React from "react";
import TopicItem from "./TopicItem";

export default class Topics extends React.Component {
  render() {
    const { topics } = this.props;
    const topicsItems = topics.map(topic => {
      return <TopicItem topic={topic} key={topic.name} />;
    });

    return <div>{topicsItems}</div>;
  }
}
