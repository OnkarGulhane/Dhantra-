// api.js - Central API Client configuration

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080/api";

export const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Network request failed" }));
    const error = new Error(errorData.message || `HTTP Error ${response.status}`);
    error.response = { status: response.status, data: errorData };
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
};

export default fetchApi;
