import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer";

export default configureStore({
  reducers: {
    product: productReducer,
  },
});
