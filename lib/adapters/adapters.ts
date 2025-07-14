import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Base URL for API calls
//export const API_BASE_URL = "http://35.160.76.71:8080";
export const API_BASE_URL = "http://localhost:8080";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};

  // Remove any quotes that might be present in the token
  const cleanToken = token.replace(/^["'](.*)["']$/, "$1");
  return { Authorization: `Bearer ${cleanToken}` };
};

// GET adapter
export const GET = async <T>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const headers = getAuthHeader();
    const response: AxiosResponse<T> = await axios.get(
      `${API_BASE_URL}${url}`,
      {
        params,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...config,
      }
    );
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// POST adapter
export const POST = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response: AxiosResponse<T> = await axios.post(
      `${API_BASE_URL}${url}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...config,
      }
    );
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

// PUT adapter
export const PUT = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response: AxiosResponse<T> = await axios.put(
      `${API_BASE_URL}${url}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...config,
      }
    );
    return response.data;
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error;
  }
};

// DELETE adapter
export const DELETE = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response: AxiosResponse<T> = await axios.delete(
      `${API_BASE_URL}${url}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...config,
      }
    );
    return response.data;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error;
  }
};
