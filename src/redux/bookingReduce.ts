import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BOOKING } from "src/constants";
import { getLocalStorage } from "src/utils";
export interface Booking {
  maPhong:number,
  maNguoiDung:number,
  id:number,
  
}
export interface BookingState{
  booking:Booking|null,
 
}

const initialState:BookingState={
  booking:getLocalStorage(BOOKING) || null,
}
const bookingRoom = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingRoom: (state:BookingState, action:PayloadAction<Booking>) => {
      state.booking = action.payload;
    },
  },
});
export const { setBookingRoom } = bookingRoom.actions;
export default bookingRoom.reducer;
