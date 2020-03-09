import React from "react";


export default class AddStuff extends React.Component {

  constructor(props){
    super(props)
    this.state = {nextStageId: props.allStages[0].id, 
 changes: props.stat.params.map(p => ({paramName: p.name, term: 0}))
    }
  }

 stuffText(id){
    if(id){
           const {  methods } = this.props;
          
         
        const nextStuff = methods.getStuffs(id).find(stuff => stuff.isA)
    
    if(nextStuff){
        const nextPhrases = methods.getPhrases(nextStuff.id)
        const nextPhrase = nextPhrases.find( p => !p.rangeName)
        if(nextPhrase){
         return `(${id}) ${nextPhrase.text.slice(0, 7)}...`}
        else return `(${id}) NOT PHRASE...`
        }
        else return 'NOT FOUND'
    }
    return null
  }

  render() {


    const {allStages, stat, methods, stageId} = this.props

const {nextStageId, changes} = this.state


    const linkItems = allStages.map(s => {
      return (
        <option value={s.id} key={s.id}>
          {this.stuffText(s.id)}
        </option>
      );
    });



    const changesItems = stat.params.map(p => {

        const change = changes.find(c => c.paramName === p.name)
         
          return (
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem",
                backgroundColor: "#ffccff",
                marginRight: "0.5rem"
              }}
             key={p.name}
            >
              {p.name}:<input type="number" value={change.term}
              onChange={e => {
                this.setState({changes: [{paramName: change.paramName, term: Number(e.target.value)}, ...changes.filter(c => c.paramName !== change.paramName)]

                })
              }}
               style={{width: '40px'}}   />
              
            </span>
          );
        })
      

      const nextStage = <select
            value={nextStageId}
            onChange={e => {
              this.setState({nextStageId: Number(e.target.value)})
            }}
          >
            {linkItems}
          </select>
  
  
    return (
      <div >
          {nextStage}
          {changesItems}
      <button onClick={() => {methods.addStuff(stageId, false, nextStageId, changes)}} >+</ button>
      </div>
    );
  }
}
