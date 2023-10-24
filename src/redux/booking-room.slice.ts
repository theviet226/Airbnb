import { createSlice } from '@reduxjs/toolkit';

interface Booking {
    id: number; 
  }

const bookingRoomSlice = createSlice({
    name: 'booking',
    initialState: {
        listBooking: [] as Booking[], 
      },
    reducers:{
        setListBooking: (state,action) =>{
            state.listBooking = action.payload
        },
        deleteBookingId: (state, action) => {
            const bookingId = action.payload.id;
            state.listBooking = state.listBooking.filter(booking => booking.id !== bookingId);
          }
          
    }
})

export const {setListBooking,deleteBookingId} =bookingRoomSlice.actions
export default bookingRoomSlice.reducer;