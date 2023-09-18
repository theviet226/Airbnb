import axios from "axios";
import { ACCESS_TOKEN } from "src/constants";
import { getLocalStorage } from "src/utils";


const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api"
export const axiosWithAuth = axios.create({
    baseURL: BASE_URL,
    timeout: 180_000, //ms -> 3p, sau 3p thi ngat ket noi api
});
export const axiosWithoutAuth = axios.create({
    baseURL: BASE_URL,
    timeout: 180_00
})
axiosWithAuth.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${getLocalStorage(ACCESS_TOKEN)}`
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)
