import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import moviesReducer from '../features/movies/moviesSlice';
import bookingsReducer from '../features/bookings/bookingsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
        bookings: bookingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
