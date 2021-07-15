import { createStore } from "redux";
import PaymentReducer from "./PaymentReducer";

const store = createStore(PaymentReducer);

export default store;
