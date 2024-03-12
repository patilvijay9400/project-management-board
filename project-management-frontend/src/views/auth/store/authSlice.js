import { createSlice } from '@reduxjs/toolkit';

// Check for the existence of a token in local storage
const initialUser = localStorage.getItem('token')
  ? { isAuthenticated: true, user: null, loading: false, error: null }
  : { isAuthenticated: false, user: null, loading: false, error: null };

const initialState = {
  ...initialUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout, login } = authSlice.actions;
export default authSlice.reducer;
