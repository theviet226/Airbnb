import {createSlice} from "@reduxjs/toolkit"
import { TRoomIteam } from "src/types"
type TState ={
    listRoom:TRoomIteam[]
}
const initialState :TState = {
    listRoom:[]
}
const roomReduce = createSlice({
    name:"roomReduce",
    initialState,
    reducers:{
        listRoomReduce :(state,action) =>{
            state.listRoom = action.payload
        },
        roomIdReduce: (state,action) =>{
            state.listRoom = action.payload
        }
    }
    
})
export const {listRoomReduce,roomIdReduce} = roomReduce.actions
export default roomReduce.reducer