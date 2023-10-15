import { createSlice } from '@reduxjs/toolkit';



const bookingRoomSlice = createSlice({
    name: 'booking',
    initialState:{
        listBooking: []
    },
    reducers:{
        setListBooking: (state,action) =>{
            state.listBooking = action.payload
        },
        deleteBookingId: (state,action) =>{
            const bookingId = action.payload;
            state.listBooking = state.listBooking.filter(booking => booking.id !== bookingId)
        },
        deleteAllBookings: (state) => {
            state.listBooking = [];
          },
    }
})

export const {setListBooking,deleteBookingId,deleteAllBookings} =bookingRoomSlice.actions
export default bookingRoomSlice.reducer;