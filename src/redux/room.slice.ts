import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
    name: 'room',
    initialState:{
        listRoom: []
    },
    reducers:{
        setListRoom :(state,action) =>{
            state.listRoom = action.payload;
        }
    }
})

export const {setListRoom} = roomSlice.actions
export default roomSlice.reducer;