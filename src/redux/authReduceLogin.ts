import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AUTH_LOGIN, PROFILE } from "src/constants"
import { getLocalStorage } from "src/utils"
export interface  UserProfile {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    gender: boolean | undefined;
    name: string;
    date: string;
  };
export interface AuthLogin {
    email:string,
   accessToken:string,
  
    
}
export interface AuthState{
    authLogin :AuthLogin|null
    isLoggedIn:boolean
    email:string
    userProfile:UserProfile|null
}
const initialState:AuthState ={
    authLogin: getLocalStorage(AUTH_LOGIN) ||null,
    isLoggedIn:false,
    email:"",
    userProfile: getLocalStorage(PROFILE) || null
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
        },
        setProfile:(state:AuthState,action:PayloadAction<UserProfile>) =>{
            state.userProfile =action.payload
        }
    }
})
export const {authLoginn,logout,setProfile} = authReducerLogin.actions
export default authReducerLogin.reducer