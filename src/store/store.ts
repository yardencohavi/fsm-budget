import { configureStore } from "@reduxjs/toolkit";
import { fsmReducer } from "./fsmSlice";

const store = configureStore({
  reducer: {
    fsm: fsmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
