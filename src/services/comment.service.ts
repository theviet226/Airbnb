import { ACCESS_TOKEN } from "src/constants"
import { axiosWithoutAuth } from "./config.service"

export const Comment = async (maPhong:string ):Promise<any>  =>{
    try {
        const resp = await axiosWithoutAuth({
            method:"get",
            url:`/binh-luan/lay-binh-luan-theo-phong/${maPhong}`,
        })
       
        return resp.data.content
        
    } catch (error) {
        console.log(error)
    }
}
export const idComment = async (data:{maPhong:string,maNguoiBinhLuan:string,ngayBinhLuan:string,noiDung:string,saoBinhLuan:string}) =>{
    try {
        
        const resp = await axiosWithoutAuth({
            method:"post",
            url:"/binh-luan",
            data,
            
        })  
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}
