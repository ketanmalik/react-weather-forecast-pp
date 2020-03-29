import React from "react";
import Aux from "../../hoc/Aux/Aux";
import getImageCode from "../../assets/imageCodes/imageCodes";
import Divider from "@material-ui/core/Divider";
import classes from "./DetailedView.module.css";

const detailedView = props => {
  console.log("ss");
  const time = props.info.dt_txt.split(" ")[1].split(":");
  let imgCode = null;
  imgCode = getImageCode(props.info.weather[0].main);
  let temp = props.info.main["temp"];
  temp = ((temp - 273.15) * 1.8 + 32).toFixed(2);
  let feelsLikeTemp = props.info.main["feels_like"];
  feelsLikeTemp = ((feelsLikeTemp - 273.15) * 1.8 + 32).toFixed(2);

  return (
    <Aux>
      <div className={classes.Wrapper}>
        <span className={classes.Time}>
          {time[0]}:{time[1]}
        </span>
        <img src={imgCode} alt="sunny" />
        <span className={classes.Temperature}>
          {temp}
          <sup>o</sup>
        </span>
        <span className={classes.Information}>
          <i>{props.info.weather[0].description}</i>
        </span>
        <p>
          wind: {props.info.wind["speed"]} mph, , feels like: {feelsLikeTemp}
          &nbsp;
          <sup>o</sup>F, pressure: {props.info.main["pressure"]} hpa
        </p>
        <Divider variant="middle" />
      </div>
    </Aux>
  );
};

export default detailedView;
