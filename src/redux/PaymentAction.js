import { MAKE_PAYMENT } from "./PaymentType";

export const makePayment = (cardNo, name, date, code, amount) => {
  return {
    type: MAKE_PAYMENT,
    payload: {
      cardNo: cardNo,
      name: name,
      date: date,
      code: code,
      amount: amount,
    },
  };
};
