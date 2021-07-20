import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/PaymentStore";
// import Payment from "./components/creditCards/Payment";
import CreditCard from "./components/creditCards/CreditCard";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import TeamPage from "./components/TeamPage/TeamPage";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export class MainRouter extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Nav
            user={this.props.user}
            handleUserLogout={this.props.handleUserLogout}
          />
          <>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route
              exact
              path="/login"
              render={(routerProps) => (
                <Login
                  {...routerProps}
                  handleUserLogin={this.props.handleUserLogin}
                  handleUserLogout={this.props.handleUserLogout}
                />
              )}
            />
            <Route path="/cc" exact component={CreditCard} />
            <Route path="/team-page" exact component={TeamPage} />
          </>
        </Provider>
      </Router>
    );
  }
}

export default MainRouter;
