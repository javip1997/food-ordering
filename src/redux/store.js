import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import profileReducer from "./profileSlice"
import themeReducer from './themeSlice'
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
    theme: themeReducer,

  },
})
