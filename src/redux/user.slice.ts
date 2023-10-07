import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  usersList: any[];
  selectedUser: any | null; 
}
const initialState: UserState = {
  usersList: [],
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.usersList = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    deleteUserId: (state, action) => {
      const userId = action.payload;
      state.usersList = state.usersList.filter(user => user.id !== userId);
    },

  },
})

export const { setUsers, setSelectedUser,deleteUserId } = userSlice.actions;
export default userSlice.reducer;
