import React from "react";

export default class Params extends React.Component {
  /* constructor() {
    super();

  }*/

  correctGrads() {
    const { grads, checkGrad } = this.props;
    const corrGrads = grads.filter(g => checkGrad(g.name));

    return corrGrads;
  }
  render() {
    const { params, lim, edit } = this.props;

    const correctGrads = this.correctGrads();
    const correctGradsItems = correctGrads.map(g => (
      <div key={g.name}>
        
        <span style={{ color: "white" }}>{g.name}</span>
      </div>
    ));

    const paramItems = params.map(param => {
      return param.isAchiev ? (
        <div key={param.name}>
          <input type="checkbox" disabled checked={param.value} />{" "}
          <span style={{ color: "white" }}>{param.name}</span>
        </div>
      ) : (
        <div key={param.name}>
          <div>
            <button
              onClick={() => {
                edit(param.name, -1);
              }}
            >
              -
            </button>
            <div
              style={{
                display: "inline-block",
                height: "15px",
                width: `${param.value * 10}px`,
                backgroundColor: "red"
              }}
            ></div>
            <div
              style={{
                display: "inline-block",
                height: "15px",
                width: `${(lim - param.value) * 10}px`,
                backgroundColor: "gray"
              }}
            ></div>

            <button
              onClick={() => {
                edit(param.name, 1);
              }}
            >
              +
            </button>
            <span style={{ color: "white" }}>{param.name}</span>
          </div>
        </div>
      );
    });

    return (
      <div>
        {paramItems}
        {correctGradsItems}
      </div>
    );
  }
}
