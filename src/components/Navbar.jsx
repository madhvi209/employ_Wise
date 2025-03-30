import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice.js";
import { Button } from "./ui/button.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user?.user);
    const { email, first_name, last_name, avatar } = user || {};

    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        toast.success("Logged out successfully.");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
            <Link to="/" className="text-2xl font-extrabold text-gray-800">
                AUTH APP
            </Link>

            <div className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                    Home
                </Link>
                <Link to="/usersList" className="text-gray-700 hover:text-blue-600 font-medium">
                    Users List
                </Link>

                {!user ? (
                    <>
                        <Button asChild className="bg-blue-600 text-white hover:bg-blue-800">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button asChild className="bg-black text-white hover:bg-gray-700">
                            <Link to="/signup">Signup</Link>
                        </Button>
                    </>
                ) : (
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2">
                            <img
                                    src={avatar || "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=220"}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border border-gray-300"
                            />
                            <span className="text-gray-700 font-medium">{first_name} {last_name}</span>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                <Link
                                        to="/userProfile"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
