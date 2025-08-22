import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    itemCount: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      state.itemCount = action.payload?.items
        ? action.payload.items.reduce((sum) => sum + 1, 0)
        : 0;
    },
    clearCart: (state) => {
      state.cart = null;
      state.itemCount = 0;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;