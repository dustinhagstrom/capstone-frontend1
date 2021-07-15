import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/PaymentStore";
import Nav from "./components/Nav/Nav";
import Payment from "./components/creditCards/Payment";
import Home from "./components/creditCards/CreditCard";

function MainRouter() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/payment" exact component={Payment} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default MainRouter;
