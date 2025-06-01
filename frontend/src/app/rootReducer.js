import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { authApi } from "../slices/api/authApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

export default rootReducer;
