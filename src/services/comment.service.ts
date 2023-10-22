
import { axiosWithAuth, axiosWithoutAuth } from "./config.service"

export const Comment = async (maPhong: string): Promise<any> => {
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: `/binh-luan/lay-binh-luan-theo-phong/${maPhong}`,
        })

        return resp.data.content

    } catch (error) {
        console.log(error)
    }
}
export const idComment = async (data: {
    maPhong: string,
    maNguoiBinhLuan: string,
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: string,
}, token: string) => {
    try {

        const headers = {
            'token': token,
        }
        const resp = await axiosWithoutAuth({
            method: "post",
            url: "/binh-luan",
            data,
            headers,

        })
        return resp.data.content
    } catch (error) {
        console.log(error)
    }
}
