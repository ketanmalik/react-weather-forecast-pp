import React from "react";
import { Link, withRouter } from "react-router-dom";
import urlCodes from "../../assets/urlCodes/urlCodes";
import classes from "./DayBanner.module.css";

const dayBanner = props => {
  const path = urlCodes(props.day.split(" ")[0].toLowerCase());
  let wrapperClass = `${classes.Wrapper}`;
  if (props.selected === props.value) {
    wrapperClass = `${classes.SideDrawer} ${classes.Active}`;
  }
  return (
    <Link
      to={path}
      className={classes.Links}
      onClick={() => props.clicked(props.value)}
    >
      <div className={wrapperClass}>
        <p>{props.day}</p>
      </div>
    </Link>
  );
};

export default withRouter(dayBanner);
