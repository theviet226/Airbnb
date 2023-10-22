import { createSlice } from '@reduxjs/toolkit';
interface UserState {
    listLocal: any[];
    selectedLocal: any | null;
}
const initialState: UserState = {
    listLocal: [],
    selectedLocal: null,
};
const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setListLocal: (state, action) => {
            state.listLocal = action.payload;
          },
        setSelectedLocal: (state, action) => {
            state.selectedLocal = action.payload;
        },
        deleteLocalId: (state, action) => {
            const localId = action.payload;
            state.listLocal = state.listLocal.filter(local => local.id !== localId);
        },
    }
})
export const { setListLocal, setSelectedLocal, deleteLocalId } = localSlice.actions;
export default localSlice.reducer;
