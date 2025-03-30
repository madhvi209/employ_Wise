import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const ChartComponent = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    let chartInstance = useRef<Chart | null>(null);
    const [chartData, setChartData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr"], // Default labels
        datasets: [
            {
                label: "Sales",
                data: [10, 20, 30, 40], // Default data
                backgroundColor: ["red", "blue", "green", "orange"]
            }
        ]
    });

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        // Destroy previous chart instance to prevent "Canvas already in use" error
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Ensure data is not undefined before passing to Chart
        if (!chartData || !chartData.labels || !chartData.datasets) {
            console.error("Chart data is missing or undefined.");
            return;
        }

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Cleanup on unmount
            }
        };
    }, [chartData]);

    return (
        <div className="relative w-full h-64">
            <canvas ref={chartRef} />
        </div>
    );
};

export default ChartComponent;
