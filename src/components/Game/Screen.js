import React from "react";
import "./Settings/style.css";

export default class Screen extends React.Component {
  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height,
      display: "inline-block",
      backgroundColor: "black",

      marginLeft: `calc(50% - ${width / 2}px)`,
      position: "absolute"
      //overflow: "hidden"
    };
    return (
      <div id="screenDom">
        <div style={style}>
          {this.props.children}

        </div>
      </div>
    );
  }
}
