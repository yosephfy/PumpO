import axios from "axios";

// Create an Axios instance with predefined configuration
const api = axios.create({
  //baseURL: "http://192.168.1.171:8080/app/",
  baseURL: "http://localhost:8080/app/",
  //baseURL: "https://a8f5-129-2-89-156.ngrok-free.app/app",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers":
      "Origin, OPTIONS, X-Requested-With, Content-Type, Accept",
  },
});

// Wrapper function for GET requests
export const getRequest = async (endpoint: string, params: any = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error: any) {
    console.error("GET Request Error:", error.response?.data || error.message);
    throw error;
  }
};

// Wrapper function for POST requests
export const postRequest = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    console.error("POST Request Error:", error.response?.data || error.message);
    throw error;
  }
};

// Wrapper function for PUT requests
export const putRequest = async (endpoint: string, data: any) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error: any) {
    console.error("PUT Request Error:", error.response?.data || error.message);
    throw error;
  }
};

// Wrapper function for PATCH requests
export const patchRequest = async (endpoint: string, data?: any) => {
  try {
    const response = await api.patch(endpoint, data);
    return response.data;
  } catch (error: any) {
    console.error(
      "PATCH Request Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Wrapper function for DELETE requests
export const deleteRequest = async (endpoint: string, data?: any) => {
  try {
    const response = await api.delete(endpoint, { data });
    return response.data;
  } catch (error: any) {
    console.error(
      "DELETE Request Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Default export for custom Axios instance
export default api;
