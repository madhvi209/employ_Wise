import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";

const UserDetails = () => {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });

    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`);
            if (!response.ok) throw new Error("User not found");

            const data = await response.json();
            if (data.data) {
                setUser(data.data);
                setFormData({
                    first_name: data.data.first_name,
                    last_name: data.data.last_name,
                    email: data.data.email
                });
            } else {
                throw new Error("Invalid user data");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update user");

            const data = await response.json();
            setUser({ ...user, ...data });
            toast.success("User updated successfully");
            setIsEditing(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: "DELETE",
            });

            if (response.status !== 204) throw new Error("Failed to delete user");

            toast.success("User deleted successfully");
            navigate("/users"); // Redirect back to the user list
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-10">
            <Navbar />
            <ToastContainer />
            <button onClick={() => navigate(-1)} className="text-blue-500 underline mb-4">
                Go Back
            </button>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="text-center">
                    <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mx-auto" />

                    {isEditing ? (
                        <div className="mt-4">
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border p-2 w-full mb-2"
                            />
                            <button onClick={handleUpdate} className="bg-green-500 text-white p-2 rounded mr-2">
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold mt-2">{user.first_name} {user.last_name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                            <div className="mt-4">
                                <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
