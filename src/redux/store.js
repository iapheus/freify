import { configureStore } from '@reduxjs/toolkit'
import generalReducer from './slices/general/generalSlice'

export const store = configureStore({
  reducer: {
    general: generalReducer,
  },
})