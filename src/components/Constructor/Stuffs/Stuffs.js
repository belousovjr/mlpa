import React from "react";
import StuffItem from "./StuffItem";

export default class Stuffs extends React.Component {
  render() {
    const { stuffs } = this.props;

    const stuffsItems = stuffs.map((stuff, i) => (
      <StuffItem key={i} stuff={stuff} />
    ));

    return <div>{stuffsItems}</div>;
  }
}
