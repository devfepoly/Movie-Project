import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    currentMovie: null,
    loading: false,
    error: null,
    filters: {
        search: '',
        genre: '',
        sortBy: 'popularity',
    },
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMoviesSuccess: (state, action) => {
            state.loading = false;
            state.movies = action.payload;
            state.error = null;
        },
        fetchMoviesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchMovieDetailsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMovieDetailsSuccess: (state, action) => {
            state.loading = false;
            state.currentMovie = action.payload;
            state.error = null;
        },
        fetchMovieDetailsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setSearchFilter: (state, action) => {
            state.filters.search = action.payload;
        },
        setGenreFilter: (state, action) => {
            state.filters.genre = action.payload;
        },
        setSortBy: (state, action) => {
            state.filters.sortBy = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {
                search: '',
                genre: '',
                sortBy: 'popularity',
            };
        },
        clearCurrentMovie: (state) => {
            state.currentMovie = null;
        },
    },
});

export const {
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchMoviesFailure,
    fetchMovieDetailsStart,
    fetchMovieDetailsSuccess,
    fetchMovieDetailsFailure,
    setSearchFilter,
    setGenreFilter,
    setSortBy,
    clearFilters,
    clearCurrentMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
