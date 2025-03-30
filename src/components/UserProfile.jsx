import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const UserProfile = () => {
    const { id } = useParams();  // Get user ID from URL
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://reqres.in/api/users/${id}`);
                const data = await response.json();
                setUser(data.data);
                setFormData({
                    first_name: data.data.first_name,
                    last_name: data.data.last_name,
                    email: data.data.email,
                });
            } catch (error) {
                toast.error("Failed to fetch user data.");
            }
        };
        fetchUser();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle update user
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setEditing(false);
                toast.success("User updated successfully.");
            } else {
                toast.error("Failed to update user.");
            }
        } catch (error) {
            toast.error("An error occurred while updating.");
        }
    };

    // Handle delete user
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("User deleted successfully.");
                navigate("/usersList"); // Redirect to user list
            } else {
                toast.error("Failed to delete user.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-10">
        <Navbar/>
            <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>

            {user ? (
                <>
                    {editing ? (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update</button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
                            <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    )}

                    <div className="mt-6 flex justify-between">
                        <button onClick={() => setEditing(!editing)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                            {editing ? "Cancel" : "Edit"}
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-600">Loading user data...</p>
            )}
        </div>
    );
};

export default UserProfile;
