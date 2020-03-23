import React from "react";
import getImageCode from "../../assets/imageCodes/imageCodes";
import classes from "./DetailedView.module.css";

const detailedView = props => {
  console.log(props);
  const time = props.info.dt_txt.split(" ")[1].split(":");
  let imgCode = null;
  console.log(props.info.weather[0].description);
  imgCode = getImageCode(props.info.weather[0].main);
  let temp = props.info.main["temp"];
  temp = ((temp - 273.15) * 1.8 + 32).toFixed(2);
  let feelsLikeTemp = props.info.main["feels_like"];
  feelsLikeTemp = ((feelsLikeTemp - 273.15) * 1.8 + 32).toFixed(2);

  return (
    <div className={classes.Wrapper}>
      <span className={classes.Time}>
        {time[0]}:{time[1]}
      </span>
      <img src={imgCode} alt="sunny" />
      <span className={classes.Temperature}>
        {temp}
        <sup>o</sup>
      </span>
      <span>
        <i>
          {props.info.weather[0].description}, feels like: {feelsLikeTemp}&nbsp;
          <sup>o</sup>F
        </i>
      </span>
      <p>
        wind: {props.info.wind["speed"]} mph, clouds: {props.info.clouds["all"]}
        %, pressure: {props.info.main["pressure"]} hpa
      </p>
      {/* <hr /> */}
    </div>
  );
};

export default detailedView;
