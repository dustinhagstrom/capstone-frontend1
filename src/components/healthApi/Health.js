import React, { Component } from "react";

import axios from "axios";

import "./Health.css";
import logo from "./Nutritionix.png";

export class Health extends Component {
  state = {
    foodsEaten: "",
    exercise: "",
    foodArray: [],
    exerciseInfo: [],
    nutritionInfo: [],
  };

  handleOnChange = (event) => {
    event.preventDefault();

    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  handleNutritionOnClick = (event) => {
    event.preventDefault();
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
        // res.data.foods.map((items, index) => {});
        let typesOfFoodArray = res.data.foods;
        let nf_calories = 0;
        let nf_cholesterol = 0;
        let nf_dietary_fiber = 0;
        let nf_potassium = 0;
        let nf_protein = 0;
        let nf_saturated_fat = 0;
        let nf_sodium = 0;
        let nf_sugars = 0;
        let nf_total_carbohydrate = 0;
        let nf_total_fat = 0;
        for (let i = 0; i < typesOfFoodArray.length; i++) {
          nf_calories = nf_calories + typesOfFoodArray[i].nf_calories;
          nf_cholesterol = nf_cholesterol + typesOfFoodArray[i].nf_cholesterol;
          nf_dietary_fiber =
            nf_dietary_fiber + typesOfFoodArray[i].nf_dietary_fiber;
          nf_potassium = nf_potassium + typesOfFoodArray[i].nf_potassium;
          nf_protein = nf_protein + typesOfFoodArray[i].nf_protein;
          nf_saturated_fat =
            nf_saturated_fat + typesOfFoodArray[i].nf_saturated_fat;
          nf_sodium = nf_sodium + typesOfFoodArray[i].nf_sodium;
          nf_sugars = nf_sugars + typesOfFoodArray[i].nf_sugars;
          nf_total_carbohydrate =
            nf_total_carbohydrate + typesOfFoodArray[i].nf_total_carbohydrate;
          nf_total_fat = nf_total_fat + typesOfFoodArray[i].nf_total_fat;
        }
        let holdingArray = [];
        holdingArray.push(
          nf_calories.toFixed(2),
          nf_cholesterol.toFixed(2),
          nf_dietary_fiber.toFixed(2),
          nf_potassium.toFixed(2),
          nf_protein.toFixed(2),
          nf_saturated_fat.toFixed(2),
          nf_sodium.toFixed(2),
          nf_sugars.toFixed(2),
          nf_total_carbohydrate.toFixed(2),
          nf_total_fat.toFixed(2)
        );
        console.log(holdingArray);
        this.setState({
          nutritionInfo: holdingArray,
          foodsEaten: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleExerciseOnClick = (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_NUTRITIONIX_API_KEY);
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
        console.log(res.data.exercises);
        let typesOfExercisesArray = res.data.exercises;
        let nf_calories = 0;
        for (let i = 0; i < typesOfExercisesArray.length; i++) {
          nf_calories = nf_calories + typesOfExercisesArray[i].nf_calories;
        }
        let holdingArray = [];
        holdingArray.push(nf_calories.toFixed(2));
        console.log(holdingArray);
        this.setState({
          exerciseInfo: holdingArray,
          exercise: "",
        });
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
        <section className="header">
          <h1>Diet and Exercise</h1>
          <img src={logo} alt="nutritionix credit for api logo" />
        </section>
        <div className="content-container">
          <div className="form-container">
            <form className="diet-form">
              <label htmlFor="food">What did you eat for your last meal?</label>
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
              <ul>
                {this.state.nutritionInfo.length > 0 && (
                  <>
                    <li>Total Calories</li>
                    <li>Total Cholesterol</li>
                    <li>Total Dietary Fiber</li>
                    <li>Total Potassium</li>
                    <li>Total Protein</li>
                    <li>Total Saturated Fat</li>
                    <li>Total Sodium</li>
                    <li>Total Sugars</li>
                    <li>Total Carbs</li>
                    <li>Total Fat</li>
                  </>
                )}
              </ul>
              <ul>
                {this.state.nutritionInfo &&
                  this.state.nutritionInfo.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
              </ul>
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
              <ul>
                {this.state.exerciseInfo.length > 0 && <li>Total Calories:</li>}
              </ul>
              <ul>
                {this.state.exerciseInfo.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Health;
