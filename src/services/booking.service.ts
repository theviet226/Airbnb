
import { axiosWithoutAuth } from "./config.service"

export const Booking =  async(data:{ngayDen:string,ngayDi:string,soLuongKhach:string}) =>{
    try {
        const resp = await axiosWithoutAuth({
            method:"post",
            url:"/dat-phong",
            data
        })
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const checkBooking = async(data:any) =>{
    try {
        const resp = await axiosWithoutAuth({
            method:"get",
            url:"/dat-phong",
            data
        })
        return resp.data
    } catch (error) {
        console.log(error)
    }
}