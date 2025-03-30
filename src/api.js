import axios from "axios";

const BASE_URL = "https://reqres.in/api";

// Function to log in the user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data; // Returns { token: "generated_token" }
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

// Function to fetch paginated users
export const getUsers = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/users?page=${page}`);
        return response.data; // Returns { page, per_page, total, total_pages, data }
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Function to update a user's details
export const updateUser = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${id}`, updatedData);
        return response.data; // Returns updated user data
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Function to delete a user
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/users/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
