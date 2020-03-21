import React from "react";
import sunny from "../../assets/images/sunny.png";
import classes from "./SelectedDay.module.css";

const selectedDay = props => {
  let day = props.day.split(" ");
  return (
    <div className={classes.Wrapper}>
      <h1>
        <span> {day[1] + " " + day[2]} - Sunny </span>
        <img src={sunny} alt="sunny" />
      </h1>
      <b>
        High - 24<sup>o</sup>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Low - 18<sup>o</sup>
      </b>
    </div>
  );
};

export default selectedDay;
