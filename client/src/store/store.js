import { configureStore } from '@reduxjs/toolkit'

import appReducer from 'src/store/slices/appSlice'
import authReducer from 'src/store/slices/authSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
})