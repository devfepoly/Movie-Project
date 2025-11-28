import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Constants
const ADMIN_ROLE = "QuanTri";
const STORAGE_KEYS = {
    USER: "user",
    TOKEN: "accessToken"
};

// Optimized: Load user from localStorage on init
const loadUserFromStorage = () => {
    try {
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);
        const accessToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

        if (userStr && accessToken) {
            const user = JSON.parse(userStr);
            return { user, isAuthenticated: true };
        }
    } catch (error) {
        console.error("Error loading user from storage:", error);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
    return { user: null, isAuthenticated: false };
};

// Initial state
const { user: storedUser, isAuthenticated: storedAuth } = loadUserFromStorage();
const initialState = {
    loading: false,
    error: null,
    user: storedUser,
    isAuthenticated: storedAuth,
};

// Login thunk - Optimized
export const authService = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/QuanLyNguoiDung/DangNhap", credentials);
            const userData = data.content;

            // Validate admin role
            if (userData.maLoaiNguoiDung !== ADMIN_ROLE) {
                return rejectWithValue("You are not authorized to access the admin panel.");
            }

            // Store in localStorage - single operation
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
            localStorage.setItem(STORAGE_KEYS.TOKEN, userData.accessToken);

            return userData;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.content ||
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    }
);

// Register thunk - Optimized
export const registerService = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/QuanLyNguoiDung/DangKy", userData);
            return data.content;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.content ||
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    }
);

// Auth slice - Optimized for React 19
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            // Reset state
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;

            // Clear storage
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(authService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authService.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(authService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
                state.isAuthenticated = false;
                state.user = null;
            })
            // Register cases
            .addCase(registerService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerService.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            });
    },
});

// Export actions
export const { logout, clearError } = authSlice.actions;

// Export reducer
export const authReducer = authSlice.reducer;
export default authSlice.reducer;