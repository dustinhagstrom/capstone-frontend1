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
          emailError: "Please enter a valid Email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  handlePasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Your passwords do not match!",
      });
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
          <form className="form">
            <div className="inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={this.handleOnChange}
                  autoFocus
                />
              </div>
              <div className="inline-container" id="last-name">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div className="button-div">
              <button disabled={true}>Sign me Up!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
