import { createSlice } from '@reduxjs/toolkit';





const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersList: [],    
    selectedUser: null 
  },
  reducers: {
    setUsers: (state, action) => {
      state.usersList = action.payload; 
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload; 
    },

  },
})

export const { setUsers, setSelectedUser} = userSlice.actions;
export default userSlice.reducer;
