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
      <div key={g.name}>{g.name}</div>
    ));

    const paramItems = params.map(param => {
      return param.isAchiev ? (
        <div key={param.name}>
          <input type="checkbox" disabled checked={param.value} /> {param.name}
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
            {param.name}
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
