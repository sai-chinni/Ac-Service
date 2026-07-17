import axios from "axios";

const api = axios.create({
    baseURL: "https://ac-service-88jy.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;