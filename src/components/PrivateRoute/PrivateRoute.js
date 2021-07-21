import React from "react";
import { Route, Redirect } from "react-router-dom";

import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";

function PrivateRoute({ component: Component, handleUserLogout, ...rest }) {
  return (
    //can have one of following props in each given Route : <Route component>, <Route render>, <Route children>function
    <Route
      {...rest}
      render={(routeProps) =>
        //the render prop function has access to all the same route props (match, location, history) as the component render prop.
        checkIfUserIsAuth() ? (
          <Component {...routeProps} handleUserLogout={handleUserLogout} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
