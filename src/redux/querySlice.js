import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
    name: "query",
    initialState: {
        history: [],
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        submitQuery: (state, action) => {
            state.history.push(action.payload);
            state.loading = true;
            state.error = null;
        },
        setResults: (state, action) => {
            state.results = action.payload;
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { submitQuery, setResults, setError } = querySlice.actions;
export default querySlice.reducer;
