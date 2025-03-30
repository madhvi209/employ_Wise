import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import queryReducer from "./querySlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        query: queryReducer,
    },
});

export default store;
