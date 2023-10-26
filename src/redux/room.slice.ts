import { createSlice } from '@reduxjs/toolkit';
import {TRoomIteam} from 'src/types/index'

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        listRoom: [] as TRoomIteam[],
        selectedLocal : null
    },
    reducers: {
        setListRoom: (state, action) => {
            state.listRoom = action.payload;
        },
        setSelectedLocal: (state, action) => {
            state.selectedLocal = action.payload;
        },
        deleteRoomId: (state, action) => {
            const roomId = action.payload;
            state.listRoom = state.listRoom.filter(room => room.id !== roomId)
        }
    }
})

export const { setListRoom, deleteRoomId,setSelectedLocal } = roomSlice.actions
export default roomSlice.reducer;