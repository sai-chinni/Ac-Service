import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "https://ac-service-88jy.onrender.com/api";

const api = axios.create({
    baseURL: BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;