import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {setError } from "../redux/userSlice.js";
import { submitQuery, setResults } from "../redux/querySlice.js";

const QueryInput = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    const handleQuerySubmit = () => {
        if (query.trim() === "") return;

        dispatch(submitQuery(query));

        // Simulate AI response delay
        setTimeout(() => {
            if (Math.random() > 0.2) {
                dispatch(setResults([{ label: "Sales", value: 120 }, { label: "Revenue", value: 80 }]));
            } else {
                dispatch(setError("Failed to fetch results"));
            }
        }, 1500);

        setQuery("");
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a business question..."
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button
                onClick={handleQuerySubmit}
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Submit Query
            </button>
        </div>
    );
};

export default QueryInput;
