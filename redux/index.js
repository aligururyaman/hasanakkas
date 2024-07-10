import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";
import otherReducer from "./reducers/otherReducer";
import userReducer from "./reducers/userReducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  other: otherReducer,
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
