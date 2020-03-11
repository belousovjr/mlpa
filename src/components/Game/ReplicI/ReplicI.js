import React from "react";
import "./style.css";

export default class ReplicI extends React.Component {
  render() {
    const { replic } = this.props;
    return <div className="replica">{replic.phrase}</div>;
  }
}
