import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import Navbar from "./Navbar";

const ResultsDisplay = () => {
    const results = useSelector((state) => state.query.results);
    const loading = useSelector((state) => state.query.loading);
    const error = useSelector((state) => state.query.error);

    if (loading) return <p className="text-center text-gray-500">Loading results...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!results.length) return <p className="text-center text-gray-500">No results yet.</p>;

    // Mock data for the chart
    const chartData = {
        labels: results.map((item) => item.label),
        datasets: [
            {
                label: "Query Results",
                data: results.map((item) => item.value),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded shadow">
        <Navbar/>
            <h2 className="text-lg font-semibold mb-2">Results</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default ResultsDisplay;
