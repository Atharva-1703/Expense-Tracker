import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserFromStorage } from "../utils/getUserInfo";
// ? get the token
const token = getUserFromStorage();

// ? add category
export const addCategoryAPI = async ({ type, name }) => {
  const response = await axios.post(
    `${BASE_URL}/category/create`,
    {
      type,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ? list categories
export const listCategoriesAPI = async () => {
  const response = await axios.get(`${BASE_URL}/category/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
