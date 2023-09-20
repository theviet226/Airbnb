import { TSignup } from "src/pages/register"
import { axiosWithoutAuth } from "./config.service"

export const authLogin = async (data:{email:string,password:string}) =>{
    try {
        const resp = await axiosWithoutAuth({
            method:"post",
            url:"/auth/signin",
            data,
        })
        return resp.data
    } catch (error) {
        
    }
}
export const authSignup = async (data:TSignup) =>{
    try {
        const resp = await axiosWithoutAuth({
            method:"post",
            url:"/auth/signup",
            data,
        })
        return resp.data
    } catch (error) {
        console.log(error)
    }
}