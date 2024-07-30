import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";
import otherReducer from "./reducers/otherReducer";
import userReducer from "./reducers/userReducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  other: otherReducer,
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
