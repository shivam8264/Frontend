import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitContactMessage = createAsyncThunk(
    'contact/submitContactMessage',
    async (contactData, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/contact/submit', contactData, {
                headers: {
                    'token': token
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        success: false,
        message: '',
        error: '',
    },
    reducers: {
        resetContactState: (state) => {
            state.success = false;
            state.message = '';
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactMessage.pending, (state) => {
                state.success = false;
                state.message = '';
                state.error = '';
            })
            .addCase(submitContactMessage.fulfilled, (state, action) => {
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(submitContactMessage.rejected, (state, action) => {
                state.success = false;
                state.error = action.payload.errors ? action.payload.errors.join(', ') : 'Submission failed';
            });
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
