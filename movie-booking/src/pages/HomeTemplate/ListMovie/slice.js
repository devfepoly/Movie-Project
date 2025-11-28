import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchListMovie = createAsyncThunk(
    "listMovie/fetchListMovie",
    async (maNhom = "GP01", { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`);
            console.log('✅ Movies fetched:', data.content);
            return data.content;
        } catch (error) {
            console.error('❌ Error fetching movies:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const listMovieSlice = createSlice({
    name: "listMovie",
    initialState,
    reducers: {
        clearListMovie: (state) => {
            state.data = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchListMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchListMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearListMovie } = listMovieSlice.actions;
export const listMovieReducer = listMovieSlice.reducer;