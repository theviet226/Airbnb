import { createSlice } from '@reduxjs/toolkit';
import {TRoomIteam} from 'src/types/index'

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        listRoom: [] as TRoomIteam[],
        selectedRoom : null
    },
    reducers: {
        setListRoom: (state, action) => {
            state.listRoom = action.payload;
        },
        setSelectedRoom: (state, action) => {
            state.selectedRoom = action.payload;
        },
        deleteRoomId: (state, action) => {
            const roomId = action.payload;
            state.listRoom = state.listRoom.filter(room => room.id !== roomId)
        }
    }
})

export const { setListRoom, deleteRoomId,setSelectedRoom } = roomSlice.actions
export default roomSlice.reducer;