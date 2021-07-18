import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-text">Login</div>
        <div className="form-div">
          <form className="form">
            <div className="block">
              <div className="block-container">
                <label>Email</label>
                <input type="text" id="email" placeholder="Email" />
              </div>
            </div>
            <div className="block">
              <div className="block-container">
                <label>Password</label>
                <input type="text" id="password" placeholder="Password" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
