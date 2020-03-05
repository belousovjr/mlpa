import React from "react";

export default class RangeItem extends React.Component {
    render() {
        const {range, isSelect, click} = this.props

        const style ={
            backgroundColor: isSelect ? "orange" : "gray",
            cursor: "pointer",
            display: "inline-block",
            margin: "0.2rem",
            padding: "0.5rem",
            color: 'white'
        }
        return (
            <div style={style} onClick={() => {click(range.name)}}>
               {range.name}
            </div>
        );
    }
}
