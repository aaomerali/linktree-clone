import { createSlice } from '@reduxjs/toolkit';

// Load all users from localStorage
const loadUsers = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});
};

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  allUsers: loadUsers(),
  isAuthenticated: !!localStorage.getItem('currentUser'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = action.payload;
      state.allUsers[newUser.username] = newUser;
      localStorage.setItem('users', JSON.stringify(Object.values(state.allUsers)));
    },
    loginUser: (state, action) => {
      const user = action.payload;
      state.currentUser = user;
      state.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('currentUser');
    },
    updateUserProfile: (state, action) => {
      const updatedUser = { ...state.currentUser, ...action.payload };
      
      // 1. Update current user in state
      state.currentUser = updatedUser;
      
      // 2. Update single user in localStorage (instead of all users)
      try {
        localStorage.setItem(`user_${updatedUser.username}`, JSON.stringify(updatedUser));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('LocalStorage error:', error);
        // Handle storage error (e.g., show user notification)
      }
      
      // 3. Maintain a separate list of usernames
      const usersList = JSON.parse(localStorage.getItem('users_list') || '[]');
      if (!usersList.includes(updatedUser.username)) {
        usersList.push(updatedUser.username);
        localStorage.setItem('users_list', JSON.stringify(usersList));
      }
    }
  }
});

const loadCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user ? { ...user, profilePicture: null } : null; // Clear large data
};

// Helper to load user by username
export const loadUser = (username) => {
  const user = JSON.parse(localStorage.getItem(`user_${username}`));
  return user || null;
};

export const { registerUser, loginUser, logoutUser, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;