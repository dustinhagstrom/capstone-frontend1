import React, { Component } from "react";

import axios from "axios";

import "./Health.css";
import logo from "./Nutritionix.png";

export class Health extends Component {
  state = {
    foodsEaten: "",
    exercise: "",
    foodArray: [],
    exerciseArray: [],
  };

  handleOnChange = (event) => {
    event.preventDefault();

    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  handleNutritionOnClick = (event) => {
    event.preventDefault();
    console.log(this.state.foodsEaten);
    axios({
      method: "post",
      url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
      headers: {
        "content-type": "application/json",
        "x-app-id": process.env.REACT_APP_NUTRITIONIX_APP_ID,
        "x-app-key": process.env.REACT_APP_NUTRITIONIX_API_KEY,
        "x-remote-user-id": "0",
      },
      data: {
        query: this.state.foodsEaten,
        timezone: "US/Eastern",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleExerciseOnClick = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://trackapi.nutritionix.com/v2/natural/exercise",
      headers: {
        "content-type": "application/json",
        "x-app-id": process.env.REACT_APP_NUTRITIONIX_APP_ID,
        "x-app-key": process.env.REACT_APP_NUTRITIONIX_API_KEY,
        "x-remote-user-id": "0",
      },
      data: {
        query: this.state.exercise,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const foodsEatenPlaceholder =
      "Ex. For breakfast I had two eggs, a sausage link, and a cup of coffee.";
    const exercisePlaceholder = "Ex. I ran two miles and did 50 pushups.";
    return (
      <div>
        <section className="header-footer">
          <h1>Diet and Exercise</h1>
          <img src={logo} alt="nutritionix credit for api logo" />
        </section>
        <div className="content-container">
          <div className="form-container">
            <form className="diet-form">
              <label htmlFor="food">What have you eaten today!</label>
              <input
                type="text"
                id="food"
                name="foodsEaten"
                className="health-input"
                onChange={this.handleOnChange}
                value={this.state.foodsEaten}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = foodsEatenPlaceholder)}
                placeholder={foodsEatenPlaceholder}
              />
              <div style={{ marginTop: "15px" }}>
                <button
                  className="center-buttons"
                  onClick={(event) => {
                    this.handleNutritionOnClick(event);
                  }}
                >
                  Get Nutrition Info
                </button>
              </div>
            </form>
            <div className="player-input">
              <ul>{/* do a .map of exercise inputs and display li's */}</ul>
            </div>
          </div>
          <div className="form-container">
            <form className="exercise-form">
              <label>What Exercises have you done today?</label>
              <input
                type="text"
                name="exercise"
                onChange={this.handleOnChange}
                value={this.state.exercise}
                className="health-input"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = exercisePlaceholder)}
                placeholder={exercisePlaceholder}
              />
              <div style={{ marginTop: "15px" }}>
                <button
                  className="center-buttons"
                  onClick={(event) => {
                    this.handleExerciseOnClick(event);
                  }}
                >
                  Get Calories Burned
                </button>
              </div>
            </form>
            <div className="player-input">
              <ul>{/* do a .map of exercise inputs and display li's */}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Health;
