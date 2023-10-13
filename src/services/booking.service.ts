
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
export const checkBooking = async (startDate:string,endDate:string) =>{
    try {
        const resp   = await axiosWithoutAuth({
            method:"get",
            url:"/dat-phong",
            params:{
                startDate,
                endDate
            }
        })
        const bookings = resp.data
        if (bookings.length > 0){
            return false
        }else{
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
