import React from "react";
import StageItem from "../Stages/StageItem";
import Stage from "../Stages/Stage";

export default class Topic extends React.Component {
  stuffText = (id) => {
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
    const { topic, stat, methods, currentStage, click, changeStage, allStages } = this.props;

    const { grads } = stat;
    const { graduation } = topic;

    const stages = methods.getStages(topic.id);
    const stagesItems = stages.map(stage => {
      const isSelect = stage.id === currentStage;

      return (
        <StageItem
          stuffText={this.stuffText}
          key={stage.id}
          stage={stage}
          isSelect={isSelect}
          click={click}
        />
      );
    });

    const optItems = grads.map(grad => {
      return (
        <option value={grad.name} key={grad.name}>
          {grad.name}
        </option>
      );
    });


    const curStage = stages.find(stage => stage.id === currentStage)

    const stageView = currentStage ?  <Stage
          stage={curStage}
          methods={methods}
          stat={stat}
          allStages={allStages}
           changeStage={changeStage}
           stuffText={this.stuffText}
          
        /> : null

    return (
      <div>
        <h1 align="center">
          Topic <input value={topic.name} onChange={(e)=>{methods.updateTopic(topic.id, e.target.value, topic.graduation)}} />, grad:
          <select
            value={graduation}
            onChange={e => {
              methods.updateTopic(topic.id, topic.name, e.target.value);
            }}
          >
            {optItems}
          </select>
           <button onClick={() => {methods.removeTopic(topic.id)}} style={{marginLeft: '1rem'}}>X</button>
        </h1>

        <br />
        <div><button onClick={() => {methods.addStage(topic.id)}} >+</button></div>
        {stagesItems}
        <br />
        {stageView}
      </div>
    );
  }
}
