import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
    bookingDetails: {
        movieId: null,
        showtime: null,
        seats: [],
        totalPrice: 0,
    },
};

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        fetchBookingsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBookingsSuccess: (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
            state.error = null;
        },
        fetchBookingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createBookingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createBookingSuccess: (state, action) => {
            state.loading = false;
            state.currentBooking = action.payload;
            state.bookings.push(action.payload);
            state.error = null;
        },
        createBookingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setBookingMovie: (state, action) => {
            state.bookingDetails.movieId = action.payload;
        },
        setBookingShowtime: (state, action) => {
            state.bookingDetails.showtime = action.payload;
        },
        addSeat: (state, action) => {
            state.bookingDetails.seats.push(action.payload);
        },
        removeSeat: (state, action) => {
            state.bookingDetails.seats = state.bookingDetails.seats.filter(
                (seat) => seat !== action.payload
            );
        },
        setTotalPrice: (state, action) => {
            state.bookingDetails.totalPrice = action.payload;
        },
        clearBookingDetails: (state) => {
            state.bookingDetails = {
                movieId: null,
                showtime: null,
                seats: [],
                totalPrice: 0,
            };
        },
        cancelBookingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        cancelBookingSuccess: (state, action) => {
            state.loading = false;
            state.bookings = state.bookings.filter(
                (booking) => booking.id !== action.payload
            );
            state.error = null;
        },
        cancelBookingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchBookingsStart,
    fetchBookingsSuccess,
    fetchBookingsFailure,
    createBookingStart,
    createBookingSuccess,
    createBookingFailure,
    setBookingMovie,
    setBookingShowtime,
    addSeat,
    removeSeat,
    setTotalPrice,
    clearBookingDetails,
    cancelBookingStart,
    cancelBookingSuccess,
    cancelBookingFailure,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
