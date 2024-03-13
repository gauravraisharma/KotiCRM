import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  modulePermission: null,
  timezone:null,
  loggedIn: false
};

const authSlice = createSlice({

  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      localStorage.setItem('accessToken', action.payload.token);
      state.token = action.payload.token,
      state.timezone = action.payload.timezone,
      state.modulePermission = action.payload.modulePermission;
      state.loggedIn = true
    },
    logout(state) {
      localStorage.clear();
      state.token = null;
      state.modulePermission = null;
      state.loggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;