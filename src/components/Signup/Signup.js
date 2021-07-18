import React, { Component } from "react";

export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  render() {
    return (
      <div className="container">
        <div className="form-text">Sign up for kickball</div>
        <div className="form-div">
          <form className="form">
            <div className="inline">
              <div className="input-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  autoFocus
                />
              </div>
              <div className="input-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  autoFocus
                />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Email</label>
                <input type="text" id="email" placeholder="Email" />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Username</label>
                <input type="text" id="username" placeholder="Username" />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Password</label>
                <input type="text" id="password" placeholder="Password" />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
