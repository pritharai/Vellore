import { createSlice } from '@reduxjs/toolkit';

const loadTotalQuantityFromStorage = () => {
  try {
    const totalQuantity = localStorage.getItem('cartTotalQuantity');
    return totalQuantity !== null ? Number(totalQuantity) : 0;
  } catch (error) {
    console.error('Error loading totalQuantity from localStorage:', error);
    return 0;
  }
};

const initialState = {
  items: [],
  totalQuantity: loadTotalQuantityFromStorage(),
  totalPrice: 0,
};

const saveTotalQuantityToStorage = (totalQuantity) => {
  try {
    localStorage.setItem('cartTotalQuantity', totalQuantity);
  } catch (error) {
    console.error('Error saving totalQuantity to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      saveTotalQuantityToStorage(state.totalQuantity);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      state.totalQuantity += item.quantity || 1;
      state.totalPrice += item.price * (item.quantity || 1);
      saveTotalQuantityToStorage(state.totalQuantity);
    },
    updateCartItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
        saveTotalQuantityToStorage(state.totalQuantity);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.quantity * item.price;
        state.items = state.items.filter((item) => item.id !== id);
        saveTotalQuantityToStorage(state.totalQuantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveTotalQuantityToStorage(state.totalQuantity);
    },
  },
});

export const { setCart, addToCart, updateCartItem, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
