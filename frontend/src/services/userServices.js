import { BASE_URL } from "../utils/url";
import axios from "axios";

export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  //   ? return promise
  return response.data;
};
