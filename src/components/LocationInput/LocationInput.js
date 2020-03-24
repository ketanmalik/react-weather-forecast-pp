import React, { Component } from "react";
import SelectUSState from "react-select-us-states";

class LocationInput extends Component {
  render() {
    return (
      <div>
        <p>
          Enter City: &nbsp;&nbsp;
          <input type="text" value="" />
          &nbsp;&nbsp; Select a state:&nbsp;&nbsp;
          <SelectUSState
            id="myId"
            className="myClassName"
            onChange={this.props.changed}
          />
        </p>
      </div>
    );
  }
}

export default LocationInput;
