import React from "react";


export default class AddTopic extends React.Component {
  constructor(props){
    super(props)
    this.state = {graduation: props.stat.grads[0].name, name: ''}
  }

  render() {
    const {graduation, name} = this.state
    const {stat, methods} = this.props
    const {grads} = stat
    const optItems = grads.map(grad =>   <option value={grad.name} key={grad.name}>
          {grad.name}
        </option>)
    
   
    return (
      <div >
       AddTopic

        <input value={name} onChange={e => {
             this.setState({name: e.target.value})}} />
          <select
            value={graduation}
            onChange={e => {
             this.setState({graduation: e.target.value})
            }}
          >
          {optItems}
          </select>

          <button onClick={() => {methods.addTopic(name, graduation)}} >+</button>

      </div>
    );
  }
}
