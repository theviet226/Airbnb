

import { TRoomIteam } from "src/types";
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
export const deleteRoom = async (id: string) => {
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
export const updateRoom = async (id: string, data: TRoomIteam, token: string) => {
    try {
        const headers = {
            'token': token
        }
        const resp = await axiosWithAuth({
            method: 'put',
            url: `/phong-thue/${id}`,
            data,
            headers
        })
        return resp.data
    } catch (error) {
        console.log(error)
    }
}



export const Room = async () => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/phong-thue",
            
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


