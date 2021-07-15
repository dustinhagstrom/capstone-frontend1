import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { connect } from "react-redux";

import "./Payment.css";

import { makePayment } from "../../redux/PaymentAction";

const initialValues = {
  cardNo: "",
  name: "",
  date: "",
  code: "",
  amount: "",
};

const onSubmit = (values) => {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", values)
    .then((response) => {
      alert("Payment Successful");
    })
    .catch((error) => {
      alert("Payment Failed");
    });
};

const validate = (values) => {
  let errors = {};

  if (!values.cardNo) {
    errors.cardNo = "Required";
  } else if (values.cardNo.length !== 16) {
    errors.cardNo = "Card number should be atleast 16 digits";
  }

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.date) {
    errors.date = "Required";
  }

  if (!values.code) {
    errors.code = "Required";
  } else if (values.code.length !== 3) {
    errors.code = "CVV should be atleast 3 digits";
  }

  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount < 1) {
    errors.amount = "Amount cannot be less than 1";
  }

  return errors;
};

function Payment(props) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  //importing system date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //as january = 0
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var day = yyyy + "-" + mm + "-" + dd;

  return (
    <div className="Payment">
      <Link to="/">
        <button className="Payment__btn--one">Back to Credit Card Input</button>
      </Link>

      <div className="Payment__form">
        <form onSubmit={formik.handleSubmit}>
          <div className="Payment__form--input">
            <label htmlFor="cardNo">Credit card number</label>
            <input
              type="text"
              id="cardNo"
              name="cardNo"
              maxLength="16"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardNo}
            />
            {formik.touched.cardNo && formik.errors.cardNo ? (
              <div id="error">{formik.errors.cardNo}</div>
            ) : null}
          </div>
          <div className="Payment__form--input">
            <label htmlFor="name">Card holder name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div id="error">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="Payment__form--input">
            <label htmlFor="date">Expiration date</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={day}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date ? (
              <div id="error">{formik.errors.date}</div>
            ) : null}
          </div>
          <div className="Payment__form--input">
            <label htmlFor="code">Security code - CVV</label>
            <input
              type="text"
              id="code"
              name="code"
              maxLength="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
            />
            {formik.touched.code && formik.errors.code ? (
              <div id="error">{formik.errors.code}</div>
            ) : null}
          </div>
          <div className="Payment__form--input">
            <label htmlFor="amount">Amount</label>
            <input
              className="Payment__form--amt"
              type="number"
              id="amount"
              name="amount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div id="error">{formik.errors.amount}</div>
            ) : null}
          </div>

          <button
            className="Payment__btn--two"
            type="submit"
            onClick={() =>
              props.makePayment(
                formik.values.cardNo,
                formik.values.name,
                formik.values.date,
                formik.values.code,
                formik.values.amount
              )
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardNo: state.cardNo,
    name: state.name,
    date: state.date,
    code: state.code,
    amount: state.amount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makePayment: (cardNo, name, date, code, amount) =>
      dispatch(makePayment(cardNo, name, date, code, amount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
