import axios from "axios";

export const axiosConfig = axios.create(
    {
        baseURL: process.env.BASE_URL || 'http://localhost:4000/api'
    }
);