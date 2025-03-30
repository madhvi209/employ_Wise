import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome to Our Platform
                </h1>
                <p className="text-lg text-gray-700 mt-4 max-w-lg">
                    Manage users seamlessly with authentication, data management, and a
                    beautiful UI.
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex space-x-4">
                    <Link to="/login">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-[#5d615b] transition">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
