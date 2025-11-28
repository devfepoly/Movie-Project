import axios from "axios";

const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk';

const api = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api',
    headers: {
        'TokenCybersoft': TOKEN_CYBERSOFT,
        'Content-Type': 'application/json',
    },
});

// Request interceptor - thêm token authorization nếu có
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - xử lý lỗi chung
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Xử lý lỗi 401 - Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            // Có thể redirect về trang login nếu cần
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;