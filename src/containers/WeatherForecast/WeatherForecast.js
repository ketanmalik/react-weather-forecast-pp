import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Aux from "../../hoc/Aux/Aux";
import LocationInput from "../../components/LocationInput/LocationInput";
import SelectedDay from "../../components/SelectedDay/SelectedDay";
import DayBanner from "../../components/DayBanner/DayBanner";
import axios from "axios";
import DetailedView from "../../components/DetailedView/DetailedView";
import BackDrop from "../../components/BackDrop/BackDrop";
import urlCodes from "../../assets/urlCodes/urlCodes";
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
    city: "Boston",
    loading: false
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
        this.setPath();
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

  cityHandler = event => {
    this.setState({ city: event.target.value });
  };

  submitButtonHandler = e => {
    e.preventDefault();
    const city = this.state.city;
    if (city.trim() === "" || city.trim() === null) {
      this.setState({ err: true });
      return;
    }
    let url1 =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=e73382b0a345da45c83279f93d8b4615";

    this.setState({ loading: true });
    axios
      .get(url1)
      .then(resp => {
        console.log(resp);
        let id = resp.data.id;
        let url =
          "http://api.openweathermap.org/data/2.5/forecast?id=" +
          id +
          "&APPID=e73382b0a345da45c83279f93d8b4615";
        axios
          .get(url)
          .then(res => {
            this.setState({ loading: false });
            this.setState({ weatherInfo: res.data.list });
            this.setDates();
            this.setState({ selectedDay: "Day0" });
            this.setBriefWeatherInfo();
            this.setState({ safeToProceed: true });
          })
          .catch(err => {
            this.setState({ loading: false });
            this.setState({ err: err });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
        this.setState({ err: err });
      });
  };

  unmountBackDrop = () => {
    this.setState({ err: null });
  };

  setPath = () => {
    let url = window.location.href.split("/");
    let day = url[url.length - 1].substring(0, 3);
    const dates = { ...this.state.dates };
    Object.keys(dates).map(key => {
      if (dates[key].split(" ")[0].toLowerCase() === day) {
        this.setState({ selectedDay: key });
      }
      return null;
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
      console.log(this.state);
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
          const path = urlCodes(date.split(" ")[0].toLowerCase());
          console.log("ss", path);
          if (window.location.href === "http://localhost:3000/") {
            return (
              <DetailedView info={weatherInfo[key]} key={key} path={path} />
            );
          } else {
            return (
              <Route
                key={key}
                path={path}
                render={props => (
                  <DetailedView
                    {...props}
                    info={weatherInfo[key]}
                    key={key}
                    path={path}
                  />
                )}
              />
            );
          }
        }
        return null;
      });
    }

    return this.state.showAnimation ? (
      this.state.selectedDay &&
      this.state.weatherInfo &&
      this.state.safeToProceed ? (
        <Aux>
          {this.state.err ? <BackDrop unmount={this.unmountBackDrop} /> : null}
          <div className={classes.LocationInputWrapper}>
            <LocationInput
              city={this.cityHandler}
              currCity={this.state.city}
              submitted={this.submitButtonHandler}
              loading={this.state.loading}
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

export default withRouter(WeatherForecast);
