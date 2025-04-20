// src/services/api.js
import { toast } from "@/components/ui/use-toast"; // Assuming Shadcn's toast

const API_BASE_URL = '/api'; // Adjust if your Flask API is served elsewhere

// Helper function to get the JWT token
const getToken = () => {
    // Prefer getting token from AuthContext if implemented, otherwise fallback to localStorage
    // For simplicity here, we use localStorage
    return localStorage.getItem('authToken');
};

// Core fetch function
const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method: method,
        headers: headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (e) {
                // Ignore if response is not JSON
            }
            console.error("API Error:", errorMessage);
            toast({
                variant: "destructive",
                title: "API Error",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }

        // Handle responses with no content (like DELETE or certain POSTs)
        if (response.status === 204 || response.headers.get("content-length") === "0") {
            return null; // Or return { success: true } if preferred
        }

        return await response.json();
    } catch (error) {
        console.error(`Error during API request to ${endpoint}:`, error);
        // Don't double-toast if already toasted above
        if (!error.message.startsWith('HTTP error!')) {
             toast({
                variant: "destructive",
                title: "Network Error",
                description: "Could not connect to the server. Please try again later.",
            });
        }
        throw error; // Re-throw to allow components to handle specific errors if needed
    }
};

// --- Authentication ---
export const loginUser = (credentials) => apiRequest('/auth/login', 'POST', credentials);
export const signUpUser = (userData) => apiRequest('/sign-up', 'POST', userData); // Assuming /sign-up exists

// --- Retailer Endpoints ---
export const getRetailerInventory = () => apiRequest('/retailers/inventory', 'GET');
export const addRetailerItem = (itemData) => apiRequest('/retailers/add_item', 'POST', itemData);
export const listRetailerItem = (itemId) => apiRequest(`/retailers/inventory/${itemId}/list`, 'POST');
export const sellRetailerItem = (itemId) => apiRequest(`/retailers/inventory/${itemId}/sell`, 'POST'); // Or DELETE if using the other endpoint
export const removeRetailerItem = (itemId) => apiRequest(`/retailers/item/remove/${itemId}`, 'DELETE');
// Conceptual Gemini endpoint call
export const predictDates = (foodName) => apiRequest('/retailers/predict_dates', 'POST', { name: foodName });

// --- NGO Endpoints ---
export const getNearbyListedFood = () => apiRequest('/ngo/filtered_food', 'GET');
export const createNgoRequest = (requestData) => apiRequest('/ngo/request', 'POST', requestData);

// --- Shared/Hypothetical Endpoints ---
// Fetching nearby NGO requests for retailer - Requires clarification on the exact endpoint
// Option 1: Specific endpoint (Ideal)
// export const getNearbyNgoRequests = (pincode) => apiRequest(`/ngo/requests/nearby?pincode=${pincode}`, 'GET');
// Option 2: Fetch all and filter client-side (Less efficient)
export const getAllNgoRequests = () => apiRequest('/ngo/requests', 'GET'); // Assuming this endpoint exists
