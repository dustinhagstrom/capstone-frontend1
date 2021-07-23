import React, { Component } from "react";

import "./Health.css";
import logo from "./Nutritionix.png";

export class Health extends Component {
  state = {
    playerInputFood: "",
    playerInputExercise: "",
    foodArray: [],
    exerciseArray: [],
  };

  render() {
    return (
      <div>
        <section className="header-footer">
          <h1>Diet and Exercise</h1>
          <img src={logo} alt="nutritionix credit for api logo" />
        </section>
        <div className="content-container">
          <div className="form-container">
            <form className="diet">
              <label htmlFor="food">
                Enter a mealtime and what you ate at that time!
              </label>
              <input
                type="text"
                id="food"
                name="foodsEaten"
                value={this.handleOnChange}
              />
            </form>
          </div>
          <div className="form-container">
            <form className="exercise">
              <label>
                What Exercises have you done today and for how long?
              </label>
              <input
                type="text"
                name="foodsEaten"
                value={this.handleOnChange}
              />
              <div className="player-input">
                <ul></ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Health;
