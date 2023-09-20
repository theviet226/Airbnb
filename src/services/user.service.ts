import { axiosWithoutAuth } from "./config.service";

export const User = async (data: { name: string, email: string, avatar: string, role: string }) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/users",
            data,
        })
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}

export const UserPage = async (pageIndex:number,pageSize:number) => {
    try {
        const resp = await axiosWithoutAuth(`users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=$${pageSize}`)
        return resp.data
    }catch(error) {
        console.log(error)
    }
}