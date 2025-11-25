import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from '../../../services/movieService';

const initialState = {
    movieDetail: null,
    showtimes: null,
    loading: false,
    error: null,
    showtimesLoading: false,
    showtimesError: null,
};

// Fetch movie detail
export const fetchMovieDetail = createAsyncThunk(
    'movieDetail/fetchMovieDetail',
    async (id, { rejectWithValue }) => {
        try {
            const data = await movieService.getMovieDetail(id);
            console.log('✅ Movie Detail:', data);
            return data;
        } catch (error) {
            console.error('❌ Error:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch movie showtimes
export const fetchMovieShowtimes = createAsyncThunk(
    'movieDetail/fetchMovieShowtimes',
    async (id, { rejectWithValue }) => {
        try {
            const data = await movieService.getMovieShowtimes(id);
            console.log('✅ Showtimes:', data);
            return data;
        } catch (error) {
            console.error('❌ Error:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState,
    reducers: {
        clearMovieDetail: (state) => {
            state.movieDetail = null;
            state.showtimes = null;
            state.error = null;
            state.showtimesError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch movie detail
            .addCase(fetchMovieDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.movieDetail = action.payload;
            })
            .addCase(fetchMovieDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch showtimes
            .addCase(fetchMovieShowtimes.pending, (state) => {
                state.showtimesLoading = true;
                state.showtimesError = null;
            })
            .addCase(fetchMovieShowtimes.fulfilled, (state, action) => {
                state.showtimesLoading = false;
                state.showtimes = action.payload;
            })
            .addCase(fetchMovieShowtimes.rejected, (state, action) => {
                state.showtimesLoading = false;
                state.showtimesError = action.payload;
            });
    },
});

export const { clearMovieDetail } = movieDetailSlice.actions;
export const movieDetailReducer = movieDetailSlice.reducer;
