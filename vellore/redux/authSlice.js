import { createSlice } from '@reduxjs/toolkit';

const loadPersistedState = () => {
  try {
    const persistedState = localStorage.getItem('authState');
    if (persistedState) {
      const parsed = JSON.parse(persistedState);
      if (parsed.user && typeof parsed.isAuthenticated === 'boolean') {
        return parsed;
      }
    }
  } catch (error) {
    console.log('Failed to parse authState from localStorage:', error.message);
  }
  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState = loadPersistedState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const userData = action.payload.user;
      state.user = {
        _id: userData._id,
        email: userData.email,
        role: userData.role || 'user',
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
      };
      state.isAuthenticated = true;
      try {
        localStorage.setItem('authState', JSON.stringify(state));
      } catch (error) {
        console.log('Failed to save authState to localStorage:', error.message);
      }
    },
    updateUser: (state, action) => {
      const userData = action.payload.user;
      state.user = {
        _id: userData._id,
        email: userData.email,
        role: userData.role || 'user',
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
      };
      state.isAuthenticated = true;
      try {
        localStorage.setItem('authState', JSON.stringify(state));
      } catch (error) {
        console.log('Failed to save authState to localStorage:', error.message);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem('authState');
      } catch (error) {
        console.log(
          'Failed to remove authState from localStorage:',
          error.message
        );
      }
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
