import { jwtDecode } from "jwt-decode";
import axios from "axios"

export function decodeJwt(token) {

    if(token === null) return null;

    return jwtDecode(token);
};

function Instance() {
    const instance = axios.create({
        baseURL: "http://localhost:8001",
        headers: {
            "Content-type": "application/json",
        },
    })

    instance.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            console.log(error);
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(error)
        }
    )
    return instance
}

async function getToken() {
    return localStorage.getItem("token");
}

export const http = Instance();