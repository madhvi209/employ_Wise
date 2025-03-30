import React from "react";
import { useSelector } from "react-redux";

const QueryHistory = () => {
    const queries = useSelector((state) => state.query?.history || []); // ✅ Prevent undefined error

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Query History</h2>
            {queries.length > 0 ? ( // ✅ Only render if there are queries
                <ul className="list-disc pl-4">
                    {queries.map((query, index) => (
                        <li key={index} className="text-gray-700">{query}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No queries yet.</p> // ✅ Show fallback text
            )}
        </div>
    );
};

export default QueryHistory;
