import React from "react";


export default class AddTopic extends React.Component {
  constructor(props){
    super(props)
    this.state = {graduation: props.stat.grads[0].name, name: '', isFin: false, isStart: false}
  }

  render() {
    const {graduation, name, isFin, isStart} = this.state
    const {stat, methods} = this.props
    const {grads} = stat
    const optItems = grads.map(grad =>   <option value={grad.name} key={grad.name}>
          {grad.name}
        </option>)
    
   
    return (
      <div >
       

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

          Start:<input type="checkbox" checked={isStart} onChange={e => {this.setState({isStart: e.target.checked})}} />

          Final:<input type="checkbox" checked={isFin} onChange={e => {this.setState({isFin: e.target.checked})}} />

          <button onClick={() => {methods.addTopic(name, graduation, isFin, isStart)}} >+</button>

      </div>
    );
  }
}
