import { BASE_URL } from "../utils/url";
import axios from "axios";

export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerAPI = async ({ username, email, password }) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, {
    username,
    email,
    password,
  });
  return response.data;
};
