import React, { Component } from "react";
import SelectUSState from "react-select-us-states";

class LocationInput extends Component {
  render() {
    return (
      <div>
        <form onSubmit={e => this.props.submitted(e)}>
          <p>
            <label htmlFor="city">
              Enter City: &nbsp;&nbsp;
              <input
                type="text"
                id="city"
                value={this.props.currCity}
                onChange={e => this.props.city(e)}
              />
            </label>
            &nbsp;&nbsp; Select a state:&nbsp;&nbsp;
            <SelectUSState
              id="myId"
              className="myClassName"
              onChange={this.props.state}
            />
            <input type="submit" value="Submit" />
          </p>
        </form>
      </div>
    );
  }
}

export default LocationInput;
