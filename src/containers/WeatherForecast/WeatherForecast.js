import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import SelectedDay from "../../components/SelectedDay/SelectedDay";
import DayBanner from "../../components/DayBanner/DayBanner";
import axios from "axios";
import DetailedView from "../../components/DetailedView/DetailedView";
import classes from "./WeatherForecast.module.css";

class WeatherForecast extends Component {
  state = {
    showAnimation: false,
    selectedDay: null,
    dates: null,
    weatherInfo: null,
    err: null,
    briefWeatherInfo: null,
    safeToProceed: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showAnimation: true }), 10);
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?id=4930956&APPID=e73382b0a345da45c83279f93d8b4615"
      )
      .then(resp => {
        console.log(resp);
        this.setState({ weatherInfo: resp.data.list });
        this.setDates();
        this.setState({ selectedDay: "Day0" });
        this.setBriefWeatherInfo();
        this.setState({ safeToProceed: true });
      })
      .catch(err => this.setState({ err: err }));
  }

  setDates = () => {
    const dateArr = this.state.weatherInfo[0].dt_txt.split(" ")[0].split("-");
    const today = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    var futureDates = { ...this.state.dates };
    var tempDate = null;
    for (var i = 0; i < 5; i++) {
      tempDate = new Date(today);
      tempDate.setDate(tempDate.getDate() + i);
      futureDates["Day" + i] = tempDate.toDateString();
    }
    this.setState({ dates: futureDates });
  };

  dayHandler = day => {
    this.setState({ selectedDay: day });
  };

  setBriefWeatherInfo = () => {
    let briefWeatherInfo = { ...this.state.briefWeatherInfo };
    let weatherInfo = { ...this.state.weatherInfo };
    let ptr = 0;
    for (var i = 0; i < 5; i++) {
      briefWeatherInfo["Day" + i] =
        weatherInfo[ptr].main["temp_min"] +
        "," +
        weatherInfo[ptr].main["temp_max"] +
        "," +
        weatherInfo[ptr].weather[0].main;
      ptr += 8;
    }
    this.setState({ briefWeatherInfo: briefWeatherInfo });
  };

  render() {
    let dayBanner = null;
    if (this.state.dates) {
      const dates = { ...this.state.dates };
      dayBanner = Object.keys(dates).map(date => {
        return (
          <DayBanner
            key={date}
            day={dates[date]}
            clicked={this.dayHandler}
            value={date}
            selected={this.state.selectedDay}
          />
        );
      });
    }
    return this.state.showAnimation ? (
      this.state.selectedDay &&
      this.state.weatherInfo &&
      this.state.safeToProceed ? (
        <Aux>
          <div className={classes.LeftWrapper}>
            <SelectedDay
              day={this.state.dates[this.state.selectedDay]}
              info={this.state.briefWeatherInfo}
              val={this.state.selectedDay}
            />
            {dayBanner}
          </div>
          <div className={classes.RightWrapper}>
            <h1>3-Hour Forecast</h1>
            <div style={{ height: "30em", overflow: "auto" }}>
              <DetailedView info={this.state.weatherInfo} />
              <DetailedView info={this.state.weatherInfo} />
              <DetailedView info={this.state.weatherInfo} />
              <DetailedView info={this.state.weatherInfo} />
              <DetailedView info={this.state.weatherInfo} />
              <DetailedView info={this.state.weatherInfo} />
            </div>
          </div>
        </Aux>
      ) : null
    ) : null;
  }
}

export default WeatherForecast;
