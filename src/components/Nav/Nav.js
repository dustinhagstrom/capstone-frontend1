import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Nav.css";
export class Nav extends Component {
  render() {
    return (
      <nav className="Nav-bar">
        <div>
          <h1>
            <Link to="/">KickBallers™</Link>
          </h1>
        </div>
        <div>
          <ul>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/profile">
                  {this.props.user.username}'s Profile
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/signup">
                  Sign Up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/team-page">
                  Your Team
                </NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  activeClassName="selected"
                  to="/login"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/login">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
