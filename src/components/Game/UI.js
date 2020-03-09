import React from "react";
import { Loc } from "../../mlpa_engine";
import mlpaState from '../../mlpa_state'

export default class UI extends React.Component {
	constructor(){
		super()
		this.loc = new Loc()
		this.loc.ssign(mlpaState)
		console.log(this.loc)
	}
 
  render() {
    return (
      <div>
        GAME!!!
      </div>
    );
  }
}
