import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import WeatherForecast from "./containers/WeatherForecast/WeatherForecast";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <WeatherForecast />
        </Layout>
      </div>
    );
  }
}

export default App;
