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
    err: null
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showAnimation: true }), 10);
    this.setDates();
    this.setState({ selectedDay: "Day0" });
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?id=4930956&APPID=e73382b0a345da45c83279f93d8b4615"
      )
      .then(resp => this.setState({ weatherInfo: resp.data.list }))
      .catch(err => this.setState({ err: err }));
  }

  setDates = () => {
    const today = new Date();
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
      this.state.selectedDay ? (
        <Aux>
          <div className={classes.LeftWrapper}>
            <SelectedDay day={this.state.dates[this.state.selectedDay]} />
            {dayBanner}
          </div>
          <div className={classes.RightWrapper}>
            <DetailedView />
          </div>
        </Aux>
      ) : null
    ) : null;
  }
}

export default WeatherForecast;
