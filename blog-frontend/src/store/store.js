import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './blogSlice'
import authSlice from './authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    blogs: blogSlice,
    // auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {

        ignoreActions: [],
        igonrePaths: []
      }
    }).concat(apiSlice.middleware),
})
setupListeners(store.dispatch)
