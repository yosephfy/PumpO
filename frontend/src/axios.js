import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8080/api/",
  origins: true,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});
