import React from "react";
import StuffItem from "./StuffItem";

export default class Stuffs extends React.Component {
  render() {
    const { methods, stage } = this.props;

    const stuffs = methods.getStuffs(stage.id);

    const stuffsItems = stuffs.map((stuff, i) => (
      <StuffItem methods={methods} key={i} stuff={stuff} />
    ));

    return <div>{stuffsItems}</div>;
  }
}
