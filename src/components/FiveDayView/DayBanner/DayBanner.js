import React from "react";
import classes from "./DayBanner.module.css";

const dayBanner = props => {
  let wrapperClass = `${classes.Wrapper}`;
  if (props.selected === props.value) {
    wrapperClass = `${classes.SideDrawer} ${classes.Active}`;
  }
  return (
    <a className={classes.Links} onClick={() => props.clicked(props.value)}>
      <div className={wrapperClass}>{props.day}</div>
    </a>
  );
};

export default dayBanner;
