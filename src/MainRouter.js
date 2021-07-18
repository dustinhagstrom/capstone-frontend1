import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/PaymentStore";
// import Payment from "./components/creditCards/Payment";
// import CreditCard from "./components/creditCards/CreditCard";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";

export class MainRouter extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Nav />
          <>
            {/* <Route path="/payment" exact component={Payment} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/login" exact component={Signup} />
          </>
        </Provider>
      </Router>
    );
  }
}

export default MainRouter;
