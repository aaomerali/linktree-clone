import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    return {
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture || null,
      bio: user.bio || '',
    };
  }
  return null;
};

const initialState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!localStorage.getItem('user'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        ...action.payload,
        profilePicture: action.payload.profilePicture || null,
        bio: action.payload.bio || '',
      };
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
        profilePicture: action.payload.profilePicture ?? state.user.profilePicture,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;