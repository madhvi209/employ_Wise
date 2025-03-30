import React, { Suspense, lazy } from "react";
import Navbar from "./Navbar";

// Lazy load components
const QueryInput = lazy(() => import("./QueryInput"));
const QueryHistory = lazy(() => import("./QueryHistory"));
const ResultsDisplay = lazy(() => import("./ResultsDisplay"));
const ChartComponent = lazy(() => import("./Chart.tsx")); // Lazy-loaded Chart

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4 text-center">AI Analytics Dashboard</h1>

      <Suspense fallback={<div className="text-center">Loading...</div>}>
        
        <div className="mb-6">
          <QueryInput />
        </div>
        <div className="mb-6">
          <QueryHistory />
        </div>
        <div className="mb-6">
          <ResultsDisplay />
        </div>
        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-lg font-semibold mb-2">Analytics Chart</h2>
          <ChartComponent />
        </div>
      </Suspense>
    </div>
  );
};

export default Dashboard;
