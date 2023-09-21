import { axiosWithoutAuth } from "./config.service";

export const Room = async (data:{tenphong:string,khach:string,hinhanh:string,vitri:string}) =>{
    try{
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/phong-thue",
            data,
        })
        console.log(resp.data)
        return resp.data.content
    }catch(error){
        console.log(error)
    }
}
export const BookingRoom = async (data:{id:string,maPhong:string,ngayDen:string,ngayDi:string,soLuongKhach:string}) =>{
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/dat-phong",
            data,
        })
        return resp.data.content
    }catch(error){
        console.log(error)
    }
}