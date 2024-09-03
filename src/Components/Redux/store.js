import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import noteReducer from './slices/noteSlice';
import bookmarkReducer from './slices/bookmarksSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: noteReducer,
        bookmark:bookmarkReducer,
        contact:contactReducer
    },
});

export default store;
