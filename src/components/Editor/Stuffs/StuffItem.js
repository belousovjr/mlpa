import React from "react";

export default class StuffItem extends React.Component {
  stuffText(id){
    if(id){
           const {  methods } = this.props;
          
         
        const nextStuff = methods.getStuffs(id).find(stuff => stuff.isA)
    
    if(nextStuff){
        const nextPhrases = methods.getPhrases(nextStuff.id)
        const nextPhrase = nextPhrases.find( p => !p.rangeName)
        console.log(nextPhrases)
        if(nextPhrase){
         return `(${id}) ${nextPhrase.text.slice(0, 7)}...`}
        else return `(${id}) NOT PHRASE...`
        }
        else return 'NOT FOUND'
    }
    return null
  }
  render() {
    const { stuff, methods, range, stat, goStage, allStages } = this.props;

  

    const phrase = methods.getPhrases(stuff.id).find(p => {
      return p.rangeName === range || (range === "none" && !p.rangeName);
    });

    const { changes } = stuff;

    const changesItems = !stuff.isA
      ? stat.params.map(p => {
          const c = changes.find(change => change.paramName === p.name);
          const term = c ? c.term : 0;
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
              {p.name}:<input type="number" style={{width: '40px'}} value={term} onChange={
                e => {
                  methods.updateStuff(stuff.id, false, stuff.next_stage_id, {paramName: p.name, term: Number(e.target.value)})
                }
              } />
            </span>
          );
        })
      : null;

    const style = {
      backgroundColor: stuff.isA ? "#ccffff" : "#D3D3D3",
      cursor: "pointer",
      margin: "0.2rem",

      paddingTop: stuff.isA ? "1rem" : "0.5rem",
      paddingBottom: stuff.isA ? "1rem" : "0.5rem",

      display: "inline-block",
      width: "50%"
    };

    const text = phrase ? phrase.text : "";


   const linkItems = allStages.map(s => {
      return (
        <option value={s.id} key={s.id}>
          {this.stuffText(s.id)}
        </option>
      );
    });

    if(!allStages.find(s => s.id === stuff.next_stage_id)){linkItems.unshift(<option value={'error'} key="0">
              {stuff.next_stage_id} NOT FOUND
            </option>)}

  


    const next = !stuff.isA ? (
      <div style={{ display: "inline-block", marginRight: "0.5rem" }}>
         <div style={{ display: "inline-block", backgroundColor: 'red', cursor: 'pointer', color: 'white'}} 
        onClick={() => 
          {
            goStage(stuff.next_stage_id);
          }
        }
        >===>
        </div>
          <select
            value={stuff.next_stage_id}
            onChange={e => {
              methods.updateStuff(stuff.id, false, Number(e.target.value))
            }}
          >
            {linkItems}
          </select>
      </div>
    ) : null;


    const removeButton = !stuff.isA ? <button onClick={() => methods.removeStuff(stuff.id)}>X</button> : null


    return (
      <div>
       {removeButton}
        <div style={style}>
        <input value={text} onChange={e => {methods.updatePhrase(stuff.id, range === 'none' ? null : range, phrase ? phrase.id :  null, e.target.value)}} />
        </div>
        {next}
        {changesItems}
      </div>
    );
  }
}
