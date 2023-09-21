import { createSlice } from '@reduxjs/toolkit';
import {TUserInfo} from 'src/types'

type TState = {
  user: TUserInfo[]
}


const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersList: [],    // Danh sách tất cả người dùng
    selectedUser: null // Người dùng được chọn để xem thông tin
  },
  reducers: {
    setUsers: (state, action) => {
      state.usersList = action.payload; // Lưu danh sách người dùng vào state
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload; // Lưu thông tin người dùng được chọn vào state
    },

  },
})

export const { setUsers, setSelectedUser} = userSlice.actions;
export default userSlice.reducer;
