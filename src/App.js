import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import MainRouter from "./MainRouter";

function App() {
  return (
    <>
      <ToastContainer />
      <MainRouter />
    </>
  );
}

export default App;
