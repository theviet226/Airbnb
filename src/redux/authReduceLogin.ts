import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AUTH_LOGIN } from "src/constants"
import { getLocalStorage } from "src/utils"

export interface AuthLogin {
    email:string,
   accessToken:string,
  
    
}
export interface AuthState{
    authLogin :AuthLogin|null
    isLoggedIn:boolean
    email:string
}
const initialState:AuthState ={
    authLogin: getLocalStorage(AUTH_LOGIN) ||null,
    isLoggedIn:false,
    email:""
}
const authReducerLogin = createSlice({
    name:"authReducer",
    initialState,
    reducers:{
        authLoginn:(state:AuthState,action:PayloadAction<AuthLogin>) =>{
            state.authLogin = action.payload
            state.isLoggedIn= true
            state.email=action.payload.email
        },
        logout:(state:AuthState) =>{
            state.authLogin = null
            state.isLoggedIn=false
            state.email = ""
        }
        
    }
})
export const {authLoginn,logout} = authReducerLogin.actions
export default authReducerLogin.reducer