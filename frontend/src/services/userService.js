import { getUserFromStorage } from "../utils/getUserInfo";
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

export const updateProfileAPI = async ({ username, email }) => {
  const token = getUserFromStorage();
  const response = await axios.put(
    `${BASE_URL}/user/updateProfile`,
    {
      username,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getProfileAPI = async () => {
  const token = getUserFromStorage();
  const response = await axios.get(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updatePasswordAPI = async ({ newPassword }) => {
  const token = getUserFromStorage();
  const response = await axios.put(
    `${BASE_URL}/user/changePassword`,
    {
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
