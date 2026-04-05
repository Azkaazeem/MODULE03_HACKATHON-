import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { portalService } from '../../services/portalService';

const loadSession = () => {
  const raw = sessionStorage.getItem('smit-auth');
  return raw ? JSON.parse(raw) : { student: null, admin: null };
};

const persist = (state) => {
  sessionStorage.setItem('smit-auth', JSON.stringify({ student: state.student, admin: state.admin }));
};

export const studentSignup = createAsyncThunk('auth/studentSignup', portalService.studentSignup);
export const studentLogin = createAsyncThunk('auth/studentLogin', portalService.studentLogin);
export const adminLogin = createAsyncThunk('auth/adminLogin', portalService.adminLogin);

const session = loadSession();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    student: session.student,
    admin: session.admin,
    status: 'idle',
    error: null,
  },
  reducers: {
    logoutStudent(state) {
      state.student = null;
      persist(state);
    },
    logoutAdmin(state) {
      state.admin = null;
      persist(state);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(studentSignup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(studentSignup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
        persist(state);
      })
      .addCase(studentSignup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(studentLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
        persist(state);
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(adminLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload;
        persist(state);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logoutStudent, logoutAdmin, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
