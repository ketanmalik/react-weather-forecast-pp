import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import LocationInput from "../../components/LocationInput/LocationInput";
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
    safeToProceed: false,
    stateSelected: null,
    city: "",
    state: ""
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
    let dateArr = weatherInfo[0].dt_txt.split(" ")[0].split("-");
    let date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

    let tempDateArr = null;
    let tempDate = null;
    let i = 0;
    let updated = false;
    Object.keys(weatherInfo).map(key => {
      tempDateArr = weatherInfo[key].dt_txt.split(" ")[0].split("-");
      tempDate = new Date(tempDateArr[0], tempDateArr[1] - 1, tempDateArr[2]);
      if (date.toDateString() === tempDate.toDateString()) {
        if (!updated) {
          briefWeatherInfo["Day" + i] =
            weatherInfo[key].main["temp_min"] +
            "," +
            weatherInfo[key].main["temp_max"] +
            "," +
            weatherInfo[key].weather[0].main;
          updated = true;
        }
      } else {
        date = new Date(tempDateArr[0], tempDateArr[1] - 1, tempDateArr[2]);
        i += 1;
        updated = false;
      }
      return null;
    });
    this.setState({ briefWeatherInfo: briefWeatherInfo });
  };

  stateHandler = stateCode => {
    console.log("state: " + stateCode);
    this.setState({ stateSelected: stateCode });
  };

  cityHandler = event => {
    console.log("city: " + event.target.value);
    this.setState({ city: event.target.value });
  };

  submitButtonHandler = e => {
    e.preventDefault();
    const city = this.state.city;
    const state = this.state.state;
    let url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "," +
      state +
      "&appid=e73382b0a345da45c83279f93d8b4615";

    axios.get(url).then(resp => {
      let id = resp.data.id;
      console.log(resp, id);
      let url =
        "http://api.openweathermap.org/data/2.5/forecast?id=" +
        id +
        "&APPID=e73382b0a345da45c83279f93d8b4615";
      console.log(url);
      axios
        .get(url)
        .then(res => {
          console.log(res);
          this.setState({ weatherInfo: res.data.list });
          this.setDates();
          this.setState({ selectedDay: "Day0" });
          this.setBriefWeatherInfo();
          this.setState({ safeToProceed: true });
        })
        .catch(err => this.setState({ err: err }));
    });
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

    let detailedView = null;
    if (this.state.safeToProceed) {
      const weatherInfo = { ...this.state.weatherInfo };
      const dates = { ...this.state.dates };
      const selectedDay = this.state.selectedDay;
      detailedView = Object.keys(weatherInfo).map(key => {
        const dateArr = weatherInfo[key].dt_txt.split(" ")[0].split("-");
        const date = new Date(
          dateArr[0],
          dateArr[1] - 1,
          dateArr[2]
        ).toDateString();
        if (date === dates[selectedDay]) {
          return <DetailedView info={weatherInfo[key]} key={key} />;
        }
        return null;
      });
    }

    return this.state.showAnimation ? (
      this.state.selectedDay &&
      this.state.weatherInfo &&
      this.state.safeToProceed ? (
        <Aux>
          <div className={classes.LocationInputWrapper}>
            <LocationInput
              city={this.cityHandler}
              currCity={this.state.city}
              state={this.stateHandler}
              submitted={this.submitButtonHandler}
            />
          </div>
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
              {detailedView}
            </div>
          </div>
        </Aux>
      ) : null
    ) : null;
  }
}

export default WeatherForecast;
