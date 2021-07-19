import React, { Component } from "react";
import { toast } from "react-toastify";
import { isEmail, isEmpty } from "validator";
import jwt_decode from "jwt-decode";

import Axios from "../utils/Axios";
import setAxiosAuthToken from "../utils/setAxiosAuthToken";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    passwordOnFocus: false,
    isButtonDisabled: true,
  };

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: "Email cannot be empty",
              isButtonDisabled: true,
            });
          } else {
            if (isEmail(this.state.email)) {
              this.setState({
                emailError: "",
              });
            }
          }
        }
        if (event.target.name === "password") {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: "Password cannot be empty",
              isButtonDisabled: true,
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isButtonDisabled === true) {
      if (this.state.passwordOnFocus) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.email &&
          this.state.password
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.name} cannot be empty.`,
        isButtonDisabled: true,
      });
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let userInputObj = {
        email: this.state.email,
        password: this.state.password,
      };
      let success = await Axios.post("/api/player/login", userInputObj);
      let jwtToken = success.data.payload;
      console.log(jwtToken);
      window.localStorage.setItem("jwtToken", jwtToken);

      setAxiosAuthToken(jwtToken);

      let decodedToken = jwt_decode(jwtToken);
      console.log(decodedToken);
      this.props.handleUserLogin(decodedToken);
      this.props.history.push("/team-page");

      toast.success("Welcome User message", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      toast.error(e.response, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  render() {
    const { email, password, emailError, passwordError, isButtonDisabled } =
      this.state;
    return (
      <div className="container">
        <div className="form-text">Login</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  autoFocus
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="error-message">{emailError && emailError}</div>
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onFocus={this.handleInputOnFocus}
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="error-message">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="button-div">
              <button type="submit" disabled={isButtonDisabled}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
