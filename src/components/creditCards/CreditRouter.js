import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/PaymentStore";
import Payment from "./Payment";
import Home from "./CreditCard";

function CreditRouter() {
  return (
    <Provider store={store}>
      <div className="App">
        <Route path="/payment" exact component={Payment} />
      </div>
    </Provider>
  );
}

export default CreditRouter;
