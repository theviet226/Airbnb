import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AUTH_LOGIN } from "src/constants"
import { getLocalStorage } from "src/utils"

export interface AuthLogin {
    email:string,
    token:string,
    id:number,
}
export interface AuthState{
    authLogin :AuthLogin|null
}
const initialState:AuthState ={
    authLogin: getLocalStorage(AUTH_LOGIN) ||null,
}
const authReducerLogin = createSlice({
    name:"authReducer",
    initialState,
    reducers:{
        authLoginn:(state:AuthState,action:PayloadAction<AuthLogin>) =>{
            state.authLogin = action.payload
        }
    }
})
export const {authLoginn} = authReducerLogin.actions
export default authReducerLogin.reducer