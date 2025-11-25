import axios from 'axios';

const API_BASE_URL = 'https://movienew.cybersoft.edu.vn/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'TokenCybersoft': TOKEN,
        'Content-Type': 'application/json',
    },
});

export const movieService = {
    // Lấy danh sách phim
    getMovieList: async (groupCode = 'GP01') => {
        const response = await apiClient.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${groupCode}`);
        return response.data.content;
    },

    // Lấy thông tin chi tiết phim
    getMovieDetail: async (movieId) => {
        const response = await apiClient.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
        return response.data.content;
    },

    // Lấy thông tin lịch chiếu theo hệ thống rạp
    getMovieShowtimes: async (movieId) => {
        const response = await apiClient.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
        return response.data.content;
    },

    // Lấy danh sách banner
    getBanners: async () => {
        const response = await apiClient.get('/QuanLyPhim/LayDanhSachBanner');
        return response.data.content;
    },
};

export default movieService;
