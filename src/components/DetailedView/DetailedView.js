import React from "react";
import sunny from "../../assets/images/sunny.png";
import classes from "./DetailedView.module.css";

const detailedView = props => {
  return (
    <div className={classes.Wrapper}>
      <span className={classes.Time}>22:00</span>
      <img src={sunny} alt="sunny" />
      <span className={classes.Temperature}>
        22<sup>o</sup>
      </span>
      <span>
        <i>clear sky</i>
      </span>
      <p>5.68, m/h clouds: 0%, 1027 hpa</p>
      {/* <hr /> */}
    </div>
  );
};

export default detailedView;
