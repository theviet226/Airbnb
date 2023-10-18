

import { axiosWithAuth, axiosWithoutAuth } from "./config.service";


export const getAllRoomList = async () => {
    try {
        const resp = await axiosWithoutAuth("/phong-thue")
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const getRoomList = async (maViTri: number | string) => {
    try {
        const resp = await axiosWithoutAuth(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const getRoomId = async (id: number | string) => {
    try {
        const resp = await axiosWithoutAuth(`/phong-thue/${id}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteRoom= async (id: string) => {
    try {
        const resp = await axiosWithAuth({
            method: 'delete',
            url: `/phong-thue/${id}`
        })
        console.log(resp.data)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}




export const Room = async (data: { tenphong: string, khach: string, hinhanh: string, vitri: string }) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/phong-thue",
            data,
        })
        console.log(resp.data)
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}
export const BookingRoom = async (data: { id: string, maPhong: string, ngayDen: string, ngayDi: string, soLuongKhach: string }) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/dat-phong",
            data,
        })
        return resp.data.content
    } catch (error) {



        console.log(error)
    }
}


