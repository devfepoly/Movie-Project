import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';

import { fetchMovieDetail, fetchMovieShowtimes, clearMovieDetail } from './slice';
import MovieHero from './components/MovieHero';
import MovieInfo from './components/MovieInfo';
import ShowtimeSection from './components/ShowtimeSection';
import TrailerModal from './components/TrailerModal';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { movieDetail, showtimes, loading, error, showtimesLoading } = useSelector(
        (state) => state.movieDetail
    );

    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    useEffect(() => {
        if (id) {
            console.log('🎬 Fetching movie detail for ID:', id);
            // Fetch movie detail and showtimes
            dispatch(fetchMovieDetail(id));
            dispatch(fetchMovieShowtimes(id));
        }

        // Cleanup on unmount
        return () => {
            dispatch(clearMovieDetail());
        };
    }, [id, dispatch]);

    // Debug: Log movie data when it changes
    useEffect(() => {
        if (movieDetail) {
            console.log('✅ Movie Detail Data:', movieDetail);
        }
        if (showtimes) {
            console.log('🎫 Showtimes Data:', showtimes);
        }
        if (error) {
            console.error('❌ Error:', error);
        }
    }, [movieDetail, showtimes, error]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
                    <p className="text-white text-lg font-semibold">Đang tải thông tin phim...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-lg text-center"
                >
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Có lỗi xảy ra</h2>
                    <p className="text-gray-300 mb-6">
                        {typeof error === 'string' ? error : 'Không thể tải thông tin phim'}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!movieDetail) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#0A0E27]">
            {/* Back Button */}
            <div className="absolute top-6 left-6 z-50">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white px-5 py-2.5 rounded-xl font-medium transition-all inline-flex items-center gap-2 border border-white/10 hover:border-white/20 shadow-lg"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                </motion.button>
            </div>

            {/* Hero Section */}
            <MovieHero
                movie={movieDetail}
                onPlayTrailer={() => setIsTrailerOpen(true)}
            />

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Main Content */}
                    <MovieInfo movie={movieDetail} />
                    <ShowtimeSection
                        showtimes={showtimes}
                        loading={showtimesLoading}
                    />
                </div>
            </div>

            {/* Trailer Modal */}
            <TrailerModal
                isOpen={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
                trailerUrl={movieDetail.trailer}
            />
        </div>
    );
}
