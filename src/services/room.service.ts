
import { axiosWithoutAuth } from "./config.service";

export const getAllRoomList = async ()=>{
    try {
        const resp = await axiosWithoutAuth("/phong-thue")
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const getRoomList = async (maViTri:number|string) =>{
    try {
        const resp = await axiosWithoutAuth(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const getRoomId = async (id:number|string) =>{
    try {
        const resp = await axiosWithoutAuth(`/phong-thue/${id}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}