import React from "react";

export default class Screen extends React.Component {
  constructor() {
    super();

  }

  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height,
      display: "inline-block",
      backgroundColor: "gray",
      marginLeft: `calc(50% - ${width / 2}px)`,
        position: 'absolute',
        overflow: 'hidden'
    };
    return <div style={style}>{this.props.children}</div>;
  }
}
