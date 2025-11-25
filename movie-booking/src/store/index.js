import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import moviesReducer from '../features/movies/moviesSlice';
import bookingsReducer from '../features/bookings/bookingsSlice';
import { listMovieReducer } from '../pages/HomeTemplate/ListMovie/slice';
import { movieDetailReducer } from '../pages/HomeTemplate/MovieDetail/slice';

export const store = configureStore({
    reducer: {
        listMovieReducer,
        movieDetail: movieDetailReducer,
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
