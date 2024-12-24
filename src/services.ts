import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:3000";
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  export { axiosInstance };
