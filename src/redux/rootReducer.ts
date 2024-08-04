import { combineReducers } from "@reduxjs/toolkit";
import { statisticsApi } from "./services/Statistics";

const rootReducer = combineReducers({
  [statisticsApi.reducerPath]: statisticsApi.reducer,
});

export const middlewares = [statisticsApi.middleware];

export default rootReducer;
