import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { middlewares } from "./rootReducer";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

setupListeners(store.dispatch);
export default store;
