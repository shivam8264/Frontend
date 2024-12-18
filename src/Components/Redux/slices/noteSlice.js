import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthToken = () => localStorage.getItem('token');

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/notes/fetchallnotes`, {
        headers: {
            'token': getAuthToken()
        }
    });
    return response.data;
});

export const addNewNote = createAsyncThunk('notes/addNewNote', async (newNote) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/notes/addnote`, newNote, {
        headers: {
            'token': getAuthToken()
        }
    });
    return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (updatedNote) => {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/notes/updatenote/${updatedNote._id}`, updatedNote, {
        headers: {
            'token': getAuthToken()
        }
    });
    return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/notes/deletenote/${id}`, {
        headers: {
            'token': getAuthToken()
        }
    });
    return id;
});

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewNote.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.items.findIndex(note => note._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.items = state.items.filter(note => note._id !== action.payload);
            });
    }
});

export default notesSlice.reducer;
