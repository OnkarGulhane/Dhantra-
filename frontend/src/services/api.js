// api.js - Central API Client configuration with automatic URL normalization

const rawBaseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080/api";

// Clean trailing slashes
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");

// Smart normalization: Ensure base URL always points to /api endpoint namespace
export const API_BASE_URL = cleanBaseUrl.endsWith("/api")
  ? cleanBaseUrl
  : `${cleanBaseUrl}/api`;

export const fetchApi = async (endpoint, options = {}) => {
  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const response = await fetch(`${API_BASE_URL}${formattedEndpoint}`, {
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
