import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import FiveDayView from "./components/FiveDayView/FiveDayView";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <FiveDayView />
        </Layout>
      </div>
    );
  }
}

export default App;
