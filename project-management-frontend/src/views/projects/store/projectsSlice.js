import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  projects: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

// Define thunk for fetching projects
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async ({ page = 1, pageSize = 10 }) => {
    const response = await axios.get(`http://localhost:5000/api/projects?page=${page}&pageSize=${pageSize}`);
    return response.data;
  }
);

// Define thunk for adding a new project
export const addProject = createAsyncThunk(
  'projects/addProject',
  async (projectData) => {
    const response = await axios.post('http://localhost:5000/api/projects', projectData);
    return response.data;
  }
);

// Define thunk for deleting a project
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId) => {
    await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
    return projectId;
  }
);

// Define thunk for updating a project
debugger
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (projectData) => {
    const { id, ...updatedData } = projectData;
    const response = await axios.put(`http://localhost:5000/api/projects/${id}`, updatedData);
    return response.data;
  }
);

// Define the projects slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProjects pending and fulfilled actions
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle addProject pending and fulfilled actions
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle deleteProject pending and fulfilled actions
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle updateProject pending and fulfilled actions
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creators and reducer
export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
