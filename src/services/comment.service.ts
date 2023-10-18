import { axiosWithoutAuth } from "./config.service"

export const Comment = async (maPhong:string ):Promise<any>  =>{
    try {
        const resp = await axiosWithoutAuth({
            method:"get",
            url:`/binh-luan/lay-binh-luan-theo-phong?maPhong=${maPhong}`,
        })
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}