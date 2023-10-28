import { axiosWithoutAuth, axiosWithAuth } from "./config.service";
import { TAdminInfo, TProfileUser } from "src/types";

export const User = async () => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/users",
        });
        return resp.data.content;
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async (id: string) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: `/users/${id}`,
        })
        console.log(resp.data.content)
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (id: string, data: { name: string, email: string, avatar: string, role: string, gender: string }) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "put",
            url: `/users/${id}`,
            data,
        });
        console.log(resp.data)
        return resp.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const resp = await axiosWithAuth({
            method: "delete",
            url: `/users?id=${id}`,
        });
        console.log(resp.data)
        return resp.data;
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (data: TAdminInfo) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "post",
            url: `/users`,
            data,
        });
        console.log(resp.data)
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}
export const updateProfile = async (data: TProfileUser) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "post",
            url: `/users`,
            data,
        });
        console.log(resp.data)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}

export const UserPage = async (pageIndex: number, pageSize: number) => {
    try {
        const resp = await axiosWithoutAuth(`users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=$${pageSize}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const UpdateAvatar = async(data:FormData,token:string) =>{
    try {
        const headers= {
            'token': token
        }
        const resp = await axiosWithoutAuth({
            method:"post",
            url:"/users/upload-avatar",
            data,
            headers,
        })
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}


