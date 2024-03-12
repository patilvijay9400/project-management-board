import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../views/auth/store/authSlice';
import projectsReducer from '../views/projects/store/projectsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});