import axios from "axios";

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "DEPLOY CLOUD ADDRESS",
  // headers: {
  //   "Content-type": "application/json",
  // },
  timeout: 50000,
});

export default Axios;
