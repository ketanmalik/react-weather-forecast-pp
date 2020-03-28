import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import WeatherForecast from "./containers/WeatherForecast/WeatherForecast";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.module.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
            <WeatherForecast />
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
