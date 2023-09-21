import { axiosWithoutAuth } from "./config.service";

export const Local = async (data:{id:string,tenViTri:string,tinhThanh:string,quocGia:string,hinhAnh:string})=>{
    try {
        const resp = await axiosWithoutAuth({
            method: "get",
            url: "/vi-tri",
            data,
        })
        return resp.data.content;
    }catch(error){
        console.log(error)
    }
}