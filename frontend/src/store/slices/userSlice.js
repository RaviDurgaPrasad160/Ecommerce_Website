import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

// Async thunk for user login
export const userLogin = createAsyncThunk('user/login', async (userCredentialObj, thunkApi) => {
  try {
    const response = await axios.post('http://localhost:8000/user-api/loginuser', userCredentialObj);
    const data = response.data;

    if (data.message === 'success') {

    // Decode token to extract expiration time
      const decodedToken = jwtDecode(data.payload)
      const expiryTime = decodedToken.exp * 1000;

      // / Store token and expiration time in localStorage
      localStorage.setItem('token', data.payload);
      localStorage.setItem('expiryTime', expiryTime)
      return data.userObj;
    } else {
      return thunkApi.rejectWithValue(data);
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    return thunkApi.rejectWithValue({ message: error.message });
  }
});

// Define the user slice
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userObj: JSON.parse(localStorage.getItem('user')) || {},
    isLoading: false,
    isError: false,
    isSuccess: !!localStorage.getItem('token'),
    errMsg: '',
  },
  reducers: {
    logoutUser : (state)=>{
      state.isSuccess = false;
      state.userObj = null;
      state.isError = false;
      state.errMsg = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expiryTime');
      return state;
    }
  }, // Add any synchronous reducers here
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.userObj = {};
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errMsg = '';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userObj = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.errMsg = action.payload?.message || 'Something went wrong';
        state.userObj = {};
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { logoutUser } = userSlice.actions
export default userSlice.reducer;