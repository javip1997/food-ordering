import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import profileReducer from "./profileSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
  },
})
