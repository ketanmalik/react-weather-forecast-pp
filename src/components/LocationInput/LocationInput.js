import React, { Component } from "react";
import classes from "./LocationInput.module.css";

class LocationInput extends Component {
  render() {
    return (
      <div>
        <form onSubmit={e => this.props.submitted(e)}>
          <p>
            <label htmlFor="city">
              Enter City: &nbsp;&nbsp;
              <input
                className={classes.CityInput}
                type="text"
                id="city"
                value={this.props.currCity}
                onChange={e => this.props.city(e)}
              />
            </label>
            <input
              className={classes.SubmitButton}
              type="submit"
              value="Submit"
            />
          </p>
        </form>
      </div>
    );
  }
}

export default LocationInput;
