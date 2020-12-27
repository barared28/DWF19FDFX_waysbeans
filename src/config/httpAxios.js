import axios from "axios";

export const API = axios.create({
  baseURL: "https://ways-beans.herokuapp.com/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
