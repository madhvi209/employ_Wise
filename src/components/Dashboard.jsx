import React from "react";
import QueryInput from "./QueryInput";
import QueryHistory from "./QueryHistory";
import ResultsDisplay from "./ResultsDisplay";
import ChartComponent from "./Chart.tsx"; // Import the Chart Component
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
    <Navbar/>
      <h1 className="text-2xl font-bold mb-4 text-center">AI Analytics Dashboard</h1>

      {/* Query Input Section */}
      <div className="mb-6">
        <QueryInput />
      </div>

      {/* Query History Section */}
      <div className="mb-6">
        <QueryHistory />
      </div>

      {/* Results Display Section */}
      <div className="mb-6">
        <ResultsDisplay />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 shadow rounded-md">
        <h2 className="text-lg font-semibold mb-2">Analytics Chart</h2>
        <ChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
