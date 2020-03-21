import React, { Component } from "react";
import SelectedDay from "./SelectedDay/SelectedDay";
import DayBanner from "./DayBanner/DayBanner";
import classes from "./FiveDayView.module.css";

class FiveDayView extends Component {
  state = {
    showAnimation: false,
    selectedDay: null,
    dates: null
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showAnimation: true }), 10);
    this.setDates();
    this.setState({ selectedDay: "Day0" });
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
        <div className={classes.Wrapper}>
          <SelectedDay day={this.state.dates[this.state.selectedDay]} />
          {dayBanner}
        </div>
      ) : null
    ) : null;
  }
}

export default FiveDayView;
