import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

const initialState = {
    movieDetail: null,
    loading: false,
    error: null,
};

// Fetch movie detail with showtimes (parallel API calls)
export const fetchMovieDetail = createAsyncThunk(
    'movieDetail/fetchMovieDetail',
    async (id, { rejectWithValue }) => {
        try {
            const [movieResult, scheduleResult] = await Promise.all([
                api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`),
                api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
            ]);

            return {
                ...movieResult.data.content,
                showtimes: scheduleResult.data.content
            };
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
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const { clearMovieDetail } = movieDetailSlice.actions;
export const movieDetailReducer = movieDetailSlice.reducer;
