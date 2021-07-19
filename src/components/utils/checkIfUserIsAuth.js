import jwt_decode from "jwt-decode";

import setAxiosAuthToken from "./setAxiosAuthToken";

const checkIfUserIsAuth = () => {
  let getJwtToken = window.localStorage.getItem("jwtToken");

  if (getJwtToken) {
    const currentTime = Date.now() / 1000;

    let decodedJwtToken = jwt_decode(getJwtToken);
    if (decodedJwtToken.exp < currentTime) {
      setAxiosAuthToken(null);
      return false;
    } else {
      setAxiosAuthToken(getJwtToken);
      return true;
    }
  } else {
    return false;
  }
};

export default checkIfUserIsAuth;
