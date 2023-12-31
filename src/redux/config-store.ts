import { configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import authReduceLogin from './authReduceLogin';
import userReducer  from './user.slice';

import roomReduce from './roomReduce';

import roomReducer from './room.slice';
import bookingReducer from './booking-room.slice'
import localReducer from './localtion.slice'
import bookingReduce from './bookingReduce';





export const store = configureStore({
  reducer: {
    authReducerLogin:authReduceLogin,
    user: userReducer,
    roomReduce:roomReduce,
   
    room : roomReducer,
    booking: bookingReducer,
    local: localReducer,
    bookingReduce:bookingReduce,
    

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector