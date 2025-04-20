// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser as apiLogin } from '@/services/api'; // Import your API function
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        // Optional: Fetch user profile if token exists on initial load
        const currentToken = localStorage.getItem('authToken');
        const currentUser = localStorage.getItem('authUser'); // Assuming user info is also stored
        if (currentToken) {
            setToken(currentToken);
            if (currentUser) {
                setUser(JSON.parse(currentUser));
            }
            // You might want to add a call here to a '/me' endpoint to verify the token
            // and get fresh user data upon initial app load.
        }
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await apiLogin(credentials); // Uses the api service
            if (response && response.token && response.user) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('authUser', JSON.stringify(response.user)); // Store user info
                setToken(response.token);
                setUser(response.user);
                 toast({ title: "Login Successful", description: `Welcome back, ${response.user.name}!` });
                setLoading(false);
                return true; // Indicate success
            } else {
                 // Handle cases where token or user might be missing in response
                throw new Error("Invalid login response from server.");
            }
        } catch (error) {
             // Error is already toasted by apiRequest helper
            console.error("Login failed:", error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
            setToken(null);
            setUser(null);
            setLoading(false);
            return false; // Indicate failure
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setToken(null);
        setUser(null);
        // Optionally redirect to login page
         toast({ title: "Logged Out", description: "You have been successfully logged out." });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
