import React, { Component } from "react";
import classes from "./BackDrop.module.css";

class BackDrop extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.unmount();
    }, 3500);
  }
  render() {
    return <div className={classes.Modal}>Please enter valid city name</div>;
  }
}

export default BackDrop;
