import { BASE_URL } from "../utils/url";
import axios from "axios";

export const loginAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data); // Backend error
    } else {
      console.error("Request Error:", error.message); // Network or Axios error
    }
    throw error;
  }
};
