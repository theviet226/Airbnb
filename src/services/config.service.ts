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
        config.headers["tokenCybersoft"] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc`
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)
axiosWithoutAuth.interceptors.request.use(
    (config) => {
        config.headers["tokenCybersoft"] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc`
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)
