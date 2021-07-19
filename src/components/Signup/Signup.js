import React, { Component } from "react";
import { isAlpha, isAlphanumeric, isEmail, isStrongPassword } from "validator";
import { toast } from "react-toastify";

import "./Signup.css";

import Axios from "../utils/Axios";
export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
    isButtonDisabled: true,
    firstNameOnFocus: "",
    lastNameOnFocus: "",
    emailOnFocus: "",
    usernameOnFocus: "",
    passwordOnFocus: "",
    confirmPasswordOnFocus: "",
  };

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstAndLastNameInput(event);
        }
        if (event.target.name === "username") {
          this.handleUsernameInput(event);
        }
        if (event.target.name === "email") {
          this.handleEmailInput(event);
        }
        if (event.target.name === "password") {
          this.handlePasswordInput();
        }
        if (event.target.name === "confirmPassword") {
          this.handleConfirmPasswordInput();
        }
      }
    );
  };

  handleFirstAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only contain letters!`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty.`,
        isButtonDisabled: true,
      });
    }
  };

  handleUsernameInput = (event) => {
    if (this.state.username.length > 0) {
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
      } else {
        this.setState({
          usernameError: `${event.target.placeholder} can only have alphanumeric characters.`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        usernameError: `${event.target.placeholder} cannot be empty.`,
        isButtonDisabled: true,
      });
    }
  };

  handleEmailInput = (event) => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: "Email cannot be empty.",
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({
          emailError: "Please enter a valid Email",
          isButtonDisabled: true,
        });
      }
    }
  };

  handlePasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Your passwords do not match!",
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }
    if (this.state.password.length > 0) {
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError: `Password must be at least 8 characters long, have at least one uppercase and lowercase letter, and contain at least one special character.`,
          isButtonDisabled: true,
        });
      }
    }
  };

  handleConfirmPasswordInput = () => {
    if (this.state.confirmPassword.length > 0) {
      if (this.state.confirmPassword === this.state.password) {
        this.setState({
          confirmPasswordError: "",
        });
      } else {
        this.setState({
          confirmPasswordError: "Your passwords do not match",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      await Axios.post("/api/player/signup", userInputObj);
      toast.success(`User created - Email sent to verify account`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // this.setState({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   username: "",
      //   password: "",
      //   confirmPassword: "",
      //   isButtonDisabled: true,
      // });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        //toast error
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

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isButtonDisabled === true) {
      if (
        this.state.lastNameOnFocus &&
        this.state.usernameOnFocus &&
        this.state.emailOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      emailError,
      usernameError,
      passwordError,
      confirmPasswordError,
    } = this.state;
    return (
      <div className="container">
        <div className="form-text">Sign up for kickball</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  autoFocus
                />
                <div className="error-message">
                  {firstNameError && firstNameError}
                </div>
              </div>
              <div className="inline-container" id="last-name">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  onBlur={this.handleOnBlur}
                />
                <div className="error-message">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  onBlur={this.handleOnBlur}
                />
                <div className="error-message">{emailError && emailError}</div>
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  onBlur={this.handleOnBlur}
                />
                <div className="error-message">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  onBlur={this.handleOnBlur}
                />
                <div className="error-message">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  onBlur={this.handleOnBlur}
                />
                <div className="error-message">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>
            <div className="button-div">
              <button disabled={this.state.isButtonDisabled}>
                Sign me Up!
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
