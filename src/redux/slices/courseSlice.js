import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { portalService } from '../../services/portalService';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', portalService.fetchCourses);
export const submitApplication = createAsyncThunk('courses/submitApplication', portalService.submitApplication);
export const saveCourse = createAsyncThunk('courses/saveCourse', portalService.saveCourse);
export const fetchApplications = createAsyncThunk('courses/fetchApplications', portalService.fetchApplications);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    applications: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.applications.unshift(action.payload);
      })
      .addCase(saveCourse.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
        else state.items.unshift(action.payload);
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
      });
  },
});

export default courseSlice.reducer;
