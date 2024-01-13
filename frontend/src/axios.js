import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.1.177:8080/api/",
  origins: true,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers":
      "Origin, OPTIONS, X-Requested-With, Content-Type, Accept",
  },
});
