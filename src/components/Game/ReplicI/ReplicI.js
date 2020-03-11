import React from "react";
import "./style.css";

export default class ReplicI extends React.Component {
  render() {
    const { replic, isPlayerReplic } = this.props;
    const style = {
      backgroundColor: isPlayerReplic ? "#ebebe0" : "white"
    };
    return (
      <div className="replica" style={style}>
        {replic.phrase}
      </div>
    );
  }
}
