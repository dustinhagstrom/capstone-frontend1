import React from "react";
import "./CreditCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CreditCard() {
  const data = useSelector((state) => [
    state.cardNo,
    state.name,
    state.date,
    state.code,
  ]);

  return (
    <div className="Home">
      <Link to="/payment">
        <button className="Home__btn">Proceed to payment</button>
      </Link>

      <h4 className="Home__stmt">Recently used card</h4>

      <div className="Home__cards">
        <h5> Credit card number: {data[0] ? data[0] : "None"}</h5>
        <h5> Account holder name: {data[1] ? data[1] : "None"}</h5>
        <h5> Expiration date: {data[2] ? data[2] : "None"}</h5>
        <h5> CVV: {data[3] ? data[3] : "None"}</h5>
      </div>
    </div>
  );
}

export default CreditCard;
