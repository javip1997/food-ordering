import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const savedCart = localStorage.getItem("cart_items")
  ? JSON.parse(localStorage.getItem("cart_items"))
  : [];

const initialState = {
  items: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
      localStorage.setItem("cart_items", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart_items", JSON.stringify(state.items));
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.qty = qty;
      localStorage.setItem("cart_items", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart_items");
    },
  },
});

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
