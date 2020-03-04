import React from "react";

export default class AddTopic extends React.Component {
  constructor(props) {
    super(props);

    this.state = { grad: props.grads[0].name, name: "" };
  }
  render() {
    const { grad, name } = this.state;
    const { grads, methods } = this.props;

    const gradsItems = grads.map(g => (
      <option key={g.name} value={g.name}>
        {g.name}
      </option>
    ));

    return (
      <div>
        name
        <input
          value={name}
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        grad
        <select
          value={grad}
          onChange={e => {
            this.setState({ grad: e.target.value });
          }}
        >
          {gradsItems}
        </select>
        <button onClick={() => methods.addTopic(name, grad)}>add topic</button>
      </div>
    );
  }
}
