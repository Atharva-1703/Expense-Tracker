import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserFromStorage } from "../utils/getUserInfo";

// ? add category
export const addCategoryAPI = async ({ type, name }) => {
  const token = getUserFromStorage();
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
  const token = getUserFromStorage();
  const response = await axios.get(`${BASE_URL}/category/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ? update category
export const updateCategoryAPI = async ({ type, name, id }) => {
  const token = getUserFromStorage();
  const response = await axios.put(
    `${BASE_URL}/category/update/${id}`,
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

// ? delete category
export const deleteCategoryAPI = async (id) => {
  const token = getUserFromStorage();
  const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
