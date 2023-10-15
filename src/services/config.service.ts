import axios from "axios";
import { TOKENCYBERSOFT } from "src/constants";



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
        config.headers["tokenCybersoft"] = TOKENCYBERSOFT
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)
axiosWithoutAuth.interceptors.request.use(
    (config) => {
        config.headers["tokenCybersoft"] = TOKENCYBERSOFT
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)
