import { createSlice } from '@reduxjs/toolkit';

const localSlice = createSlice({
    name: 'loacl',
    initialState:{
        listLocal:[]
    },
    reducers:{
        setListLocal: (state,action) =>{
            state.listLocal= action.payload;
        }
    }
})
export const {setListLocal} = localSlice.actions;
export default localSlice.reducer;
