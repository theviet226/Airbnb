import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TComment } from "src/types"

interface CommentState {
    listComment: TComment[];
  }
const initialState:CommentState={
    listComment:[]
}
const commentSlice= createSlice({
    name:"comment",
    initialState,
    reducers:{
        commentList:(state,action:PayloadAction<TComment[]>)=>{
            state.listComment=action.payload
        }
    }
})
export const {commentList} = commentSlice.actions
export default commentSlice.reducer