import React from "react";

export default class StuffItem extends React.Component {
  constructor(props) {
    super(props);

    const nextStage = props.allStages.find(
      s => s.id === props.stuff.next_stage_id
    );
    const currentTopic = nextStage?.topic_id;

    this.state = {
      currentTopic
    };
  }
  render() {
    const {
      stuff,
      methods,
      range,
      stat,
      goStage,
      allStages,
      stuffText,
      allTopics
    } = this.props;

    const phrase = methods.getPhrases(stuff.id).find(p => {
      return (
        p.rangeName === range ||
        (range === "none" && !p.rangeName) ||
        (range === "GENERAL" && p.isGeneral)
      );
    });

    const { changes } = stuff;
    const { currentTopic } = this.state;

    const changesItems = !stuff.isA
      ? stat.params.map(p => {
          const c = changes.find(change => change.paramName === p.name);

          const term = c ? c.term : p.isAchiev ? false : 0;

          const inputElem = p.isAchiev ? (
            <input
              type="checkbox"
              checked={term}
              onChange={e => {
                methods.updateStuff(stuff.id, stuff.next_stage_id, {
                  paramName: p.name,
                  term: Boolean(e.target.checked)
                });
              }}
            />
          ) : (
            <input
              type="number"
              style={{ width: "40px" }}
              value={term}
              onChange={e => {
                methods.updateStuff(stuff.id, stuff.next_stage_id, {
                  paramName: p.name,
                  term: Number(e.target.value)
                });
              }}
            />
          );

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
              {p.name}:{inputElem}
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
      width: "40%"
    };

    const text = phrase ? phrase.text : "";

    const linkItems = methods.getStages(this.state.currentTopic).map(s => {
      return (
        <option value={s.id} key={s.id}>
          {stuffText(s.id)}
        </option>
      );
    });

    if (!allStages.find(s => s.id === stuff.next_stage_id)) {
      linkItems.unshift(
        <option value={"error"} key="0">
          {stuff.next_stage_id} NOT FOUND
        </option>
      );
    }

    const linkThemesItems = allTopics.map(t => {
      return (
        <option value={t.id} key={t.id}>
          {t.name}
        </option>
      );
    });

    const next = !stuff.isA ? (
      <div style={{ display: "inline-block", marginRight: "0.5rem" }}>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "red",
            cursor: "pointer",
            color: "white"
          }}
          onClick={() => {
            goStage(stuff.next_stage_id);
          }}
        >
          ===>
        </div>
        {currentTopic}

        <select
          value={this.state.currentTopic}
          onChange={e => {
            const newCurrTopic = Number(e.target.value);
            this.setState({ currentTopic: newCurrTopic });
            const topicStages = methods.getStages(newCurrTopic);

            if (
              topicStages.length &&
              !topicStages.find(s => s.id === stuff.next_stage_id)
            )
              methods.updateStuff(stuff.id, topicStages[0].id);
          }}
        >
          {linkThemesItems}
        </select>

        <select
          value={stuff.next_stage_id}
          onChange={e => {
            methods.updateStuff(stuff.id, Number(e.target.value));
          }}
        >
          {linkItems}
        </select>
      </div>
    ) : null;

    const removeButton = !stuff.isA ? (
      <button onClick={() => methods.removeStuff(stuff.id)}>X</button>
    ) : null;

    return (
      <div>
        {removeButton}
        <div style={style}>
          ({stuff.id}){" "}
          <input
            value={text}
            style={{ width: "90%" }}
            onChange={e => {
              methods.updatePhrase(
                stuff.id,
                range === "none" ? null : range,
                phrase ? phrase.id : null,
                e.target.value
              );
            }}
          />
        </div>
        {next}
        {changesItems}
      </div>
    );
  }
}
