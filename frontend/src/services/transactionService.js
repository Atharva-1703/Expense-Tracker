import { getUserFromStorage } from "../utils/getUserInfo";
import { BASE_URL } from "../utils/url";
import axios from "axios";

// ? add transactions
export const addTransactionAPI = async ({
  type,
  amount,
  category,
  date,
  description,
}) => {
  const token = getUserFromStorage();
  const response = await axios.post(
    `${BASE_URL}/transaction/create`,
    {
      type,
      amount,
      category,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ? list transactions
export const listTransactionsAPI = async ({
  startDate,
  endDate,
  type,
  category,
}) => {
  const token = getUserFromStorage();
  const response = await axios.get(`${BASE_URL}/transaction/lists`, {
    params: {
      category,
      type,
      startDate,
      endDate,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ? update transactions
export const updateTransactionAPI = async ({
  type,
  amount,
  category,
  date,
  description,
  id,
}) => {
  const token = getUserFromStorage();
  const response = await axios.put(
    `${BASE_URL}/transaction/update/${id}`,
    {
      type,
      amount,
      category,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ? delete transactions
export const deleteTransactionAPI = async (id) => {
  const token = getUserFromStorage();
  const response = await axios.delete(`${BASE_URL}/transaction/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
