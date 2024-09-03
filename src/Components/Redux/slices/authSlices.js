import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        if (response.data.success) {
            const { authToken, user } = response.data;
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(user));
            return { authToken, user };
        } else {
            return thunkAPI.rejectWithValue('Login failed');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Login failed');
    }
});

export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
        if (response.data.success) {
            const { authToken, user } = response.data;
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(user));
            return { authToken, user };
        } else {
            return thunkAPI.rejectWithValue('Signup failed');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Signup failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: parsedUser,
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.authToken;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.authToken;
                state.user = action.payload.user;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
