import { TLocalInfo } from "src/types";
import { axiosWithAuth, axiosWithoutAuth } from "./config.service";

export const Local = async () => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/vi-tri",
        })
        return resp.data.content;
    } catch (error) {
        console.log(error)
    }
}

export const addLocal = async (data: TLocalInfo, token: string) => {
    try {
        const headers = {
            'token': token,
        }
        const resp = await axiosWithoutAuth({
            method: 'post',
            url: `/vi-tri`,
            data,
            headers,
        })
        console.log(resp.data.content)
        return resp.data.content;
    } catch (error) {
        console.log(error)
    }
}
export const updateLocal = async (id: string, data: TLocalInfo, token: string) => {
    try {
        const headers = {
            'token': token
        }
        const resp = await axiosWithAuth({
            method: "put",
            url: `/vi-tri/${id}`,
            data,
            headers,
        })
        // console.log(resp.data)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteLocal = async (id: string, token: string) => {
    try {
        const headers = {
            'token': token
        }
        const resp = await axiosWithAuth({
            method: 'delete',
            url: `/vi-tri/${id}`,
            headers
        })
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}

export const uploadImageLocal = async (maViTri: string, data:  FormData, token: string) => {
    try {

        const headers = {
            'token': token,
            'Content-Type': 'multipart/form-data', 
        }
        const resp = await axiosWithoutAuth({
            method: 'post',
            url: `/vi-tri/upload-hinh-vitri?maViTri=${maViTri}`,
            data,
            headers
        })
        console.log(resp.data.content)
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}