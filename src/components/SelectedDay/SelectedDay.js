import React from "react";

import getImageCode from "../../assets/imageCodes/imageCodes";
import classes from "./SelectedDay.module.css";

const selectedDay = props => {
  let day = props.day.split(" ");
  let lo = props.info[props.val].split(",")[0];
  let hi = props.info[props.val].split(",")[1];
  let main = props.info[props.val].split(",")[2];
  let imgCode = null;
  imgCode = getImageCode(main);

  //Convert Kelvin to Fahrenheit
  lo = ((lo - 273.15) * 1.8 + 32).toFixed(2);
  hi = ((hi - 273.15) * 1.8 + 32).toFixed(2);
  return (
    <div className={classes.Wrapper}>
      <h1>
        <span>
          {" "}
          {day[1] + " " + day[2]} - {main}{" "}
        </span>
        <img src={imgCode} alt="sunny" />
      </h1>
      <b>
        Low - {lo}
        &nbsp;<sup>o</sup>F &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; High - {hi}
        &nbsp;<sup>o</sup>F
      </b>
    </div>
  );
};

export default selectedDay;
