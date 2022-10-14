import axios from "axios";

export const axiosConfig = axios.create(
    {
        baseURL: process.env.BASE_URL || "https://backend-inventario-iudigital.herokuapp.com/api"
    }
);