import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import "./App.css";
import MainRouter from "./MainRouter";
import setAxiosAuthToken from "./components/utils/setAxiosAuthToken";

import "react-toastify/dist/ReactToastify.css";
export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    let getJwtToken = window.localStorage.getItem("jwtToken");
    if (getJwtToken) {
      const currentTime = Date.now() / 1000;

      let decodedJwtToken = jwtDecode(getJwtToken);

      if (decodedJwtToken.exp < currentTime) {
        this.handleUserLogout();
      } else {
        this.handleUserLogin(decodedJwtToken);
      }
    }
  };

  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email,
        username: user.username,
      },
    });
  };

  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken");
    setAxiosAuthToken(null);
    this.setState({
      user: null,
    });
  };

  render() {
    return (
      <>
        <ToastContainer />
        <MainRouter
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}
        />
      </>
    );
  }
}

export default App;
