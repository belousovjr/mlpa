import React from "react";
import "./style.css";

export default class Alert extends React.Component {
  render() {
    const { text } = this.props;
    const className = text ? "alert" : "";
    return (
      <div className={className}>
        <div className="fas fa-lock-open alert-ico"></div>
        {text.toUpperCase()}
      </div>
    );
  }
}
