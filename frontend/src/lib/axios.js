import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;