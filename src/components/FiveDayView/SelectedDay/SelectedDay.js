import React from "react";
import sunny from "../../../assets/images/sunny.png";
import classes from "./SelectedDay.module.css";

const selectedDay = props => (
  <div className={classes.Wrapper}>
    <h1>
      <span> {props.day} - Sunny </span>
      <img src={sunny} alt="sunny" />
    </h1>
    High - 24<sup>o</sup>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Low - 18<sup>o</sup>
  </div>
);

export default selectedDay;
