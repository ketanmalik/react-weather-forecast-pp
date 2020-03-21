import React, { Component } from "react";
import SelectedDay from "./SelectedDay/SelectedDay";
import DayBanner from "./DayBanner/DayBanner";
import classes from "./FiveDayView.module.css";

class FiveDayView extends Component {
  state = {
    showAnimation: false,
    selectedDay: "Today"
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showAnimation: true }), 10);
  }
  render() {
    return this.state.showAnimation ? (
      <div className={classes.Wrapper}>
        <SelectedDay day={this.state.selectedDay} />
        <DayBanner />
        <DayBanner />
        <DayBanner />
        <DayBanner />
        <DayBanner />
      </div>
    ) : null;
  }
}

export default FiveDayView;
