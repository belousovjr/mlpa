import React from "react";

export default class StuffItem extends React.Component {
  stuffText(id){
    if(id){
           const {  methods } = this.props;
         
        //const nextStage = allStages.find(s => s.id === stuff.next_stage_id)
        const nextStuff = methods.getStuffs(id).find(stuff => stuff.isA)
    
    if(nextStuff){
        const nextPhrase = methods.getPhrases(nextStuff.id).find( p => !p.rangeName).text
        return `${nextPhrase.slice(0, 5)}...`
        }
        else return 'NOT FOUND'
    }
    return null
  }
  render() {
    const { stuff, methods, range, stat, goStage } = this.props;

    const linkText = this.stuffText(stuff.next_stage_id)
    

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
              {p.name}: {term}
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

    const text = phrase ? phrase.text : "___";

    const next = !stuff.isA ? (
      <div style={{ display: "inline-block", marginRight: "0.5rem" }}>
        ====> <div style={{ display: "inline-block", backgroundColor: 'red', cursor: 'pointer', color: 'white'}} 
        onClick={() => 
          {
            goStage(stuff.next_stage_id);
          }
        }
        >({stuff.next_stage_id}) {linkText}
        </div>
      </div>
    ) : null;



    return (
      <div>
        <div style={style}>"{text}"</div>
        {next}
        {changesItems}
      </div>
    );
  }
}
