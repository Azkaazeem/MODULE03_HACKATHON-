import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { portalService } from '../../services/portalService';

export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', portalService.fetchLeaves);
export const submitLeave = createAsyncThunk('leaves/submitLeave', portalService.submitLeave);
export const updateLeaveStatus = createAsyncThunk('leaves/updateLeaveStatus', portalService.updateLeaveStatus);

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitLeave.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      });
  },
});

export default leaveSlice.reducer;
