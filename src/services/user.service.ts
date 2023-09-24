import { axiosWithoutAuth ,axiosWithAuth} from "./config.service";

export const User = async (data: { name: string, email: string, avatar: string, role: string, gender: string }) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/users",
            data,
        })
        // console.log(resp.data.content)
        return resp.data.content

    } catch (error) {
        console.log(error)
    }
}
export const updateUser = async (id: string, data: { name: string, email: string, avatar: string, role: string, gender: string }) => {
    try {
        const resp = await axiosWithAuth({
            method: "put",
            url: `/users/${id}`,
            data: data,
        });
        console.log(resp.data)
        return resp.data; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
};


export const UserPage = async (pageIndex: number, pageSize: number) => {
    try {
        const resp = await axiosWithoutAuth(`users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=$${pageSize}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}


