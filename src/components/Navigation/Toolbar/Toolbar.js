import React, { Component } from "react";
import logo from "../../../assets/images/logo.png";
import classes from "./Toolbar.module.css";

class Toolbar extends Component {
  state = {
    showHeading: false
  };
  componentDidMount() {
    setTimeout(() => this.setState({ showHeading: true }), 10);
  }

  render() {
    const styles = {
      heading: {
        marginTop: "10px",
        opacity: this.state.showHeading ? 1 : 0,
        transition: "opacity 2s"
      },
      logo: {
        opacity: this.state.showHeading ? 1 : 0,
        transition: "opacity 2s"
      }
    };

    return (
      <div className={classes.Toolbar}>
        <img style={styles.logo} src={logo} alt="Logo" />
        <h2 style={styles.heading}>Weather Forecast in Boston</h2>
      </div>
    );
  }
}

export default Toolbar;
