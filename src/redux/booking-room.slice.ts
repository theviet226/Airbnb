import { createSlice } from '@reduxjs/toolkit';


const bookingRoomSlice = createSlice({
    name: 'booking',
    initialState:{
        listBooking: []
    },
    reducers:{
        setListBooking: (state,action) =>{
            state.listBooking = action.payload
        }
    }
})

export const {setListBooking} =bookingRoomSlice.actions
export default bookingRoomSlice.reducer;