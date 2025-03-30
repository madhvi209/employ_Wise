import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate(); // Use for navigation

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            const data = await response.json();
            setUsers(data.data);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4 text-center">Users List</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white p-4 rounded shadow-md flex items-center space-x-4 cursor-pointer hover:bg-gray-200"
                        onClick={() => navigate(`/user/${user.id}`)}
                    >
                        <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full" />
                        <div>
                            <h3 className="text-lg font-semibold">{user.first_name} {user.last_name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center space-x-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 bg-gray-200">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersList;
