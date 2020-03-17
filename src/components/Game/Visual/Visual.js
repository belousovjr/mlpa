import React from "react";

export default class Visual extends React.Component {

  async componentDidMount() {
    const c = this.refs.myCanvas;
    const ctx = c.getContext("2d");

    let img = new Image();
    img.src = `${window.location.href}/img/background.png`;

    img.onload = event => {
      const { target } = event;
      ctx.drawImage(target, 0, 0, c.width, c.height);
    };
  }

  render() {
    const { width, height } = this.props;
    return (
      <div>
        <canvas
          id="myCanvas"
          ref="myCanvas"
          width={width}
          height={height}
        ></canvas>
      </div>
    );
  }
}
