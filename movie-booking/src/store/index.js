import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import bookingsReducer from '../features/bookings/bookingsSlice';
import { listMovieReducer } from '../pages/HomeTemplate/ListMovie/slice';
import { movieDetailReducer } from '../pages/HomeTemplate/MovieDetail/slice';
// Use optimized auth reducer
import { authReducer } from '../pages/AdminTemplate/Auth/slice';

export const store = configureStore({
    reducer: {
        listMovieReducer,
        movieDetail: movieDetailReducer,
        auth: authReducer, // Optimized Auth slice with React 19 patterns
        movies: moviesReducer,
        bookings: bookingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
