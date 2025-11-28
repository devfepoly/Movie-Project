import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';

import { fetchMovieDetail, clearMovieDetail } from './slice';
import MovieHero from './components/MovieHero';
import MovieInfo from './components/MovieInfo';
import ShowtimeSection from './components/ShowtimeSection';
import TrailerModal from './components/TrailerModal';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { movieDetail, loading, error } = useSelector(
        (state) => state.movieDetail
    );

    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    useEffect(() => {
        if (id) {
            console.log('🎬 Fetching movie detail for ID:', id);
            dispatch(fetchMovieDetail(id));
        }

        return () => {
            dispatch(clearMovieDetail());
        };
    }, [id, dispatch]);

    // Debug: Log movie data when it changes
    useEffect(() => {
        if (movieDetail) {
            console.log('✅ Movie Detail Data:', movieDetail);
        }
        if (error) {
            console.error('❌ Error:', error);
        }
    }, [movieDetail, error]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-border-default border-t-accent-primary mb-4"></div>
                    <p className="text-text-primary text-lg font-medium">Đang tải thông tin phim...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-bg-secondary border border-accent-primary rounded-xl p-8 max-w-lg text-center"
                >
                    <AlertCircle className="w-16 h-16 text-accent-primary mx-auto mb-4" strokeWidth={2} />
                    <h2 className="text-2xl font-semibold text-text-primary mb-2">Có lỗi xảy ra</h2>
                    <p className="text-text-secondary mb-6">
                        {typeof error === 'string' ? error : 'Không thể tải thông tin phim'}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-accent-primary hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2 border border-accent-primary"
                    >
                        <ArrowLeft className="w-5 h-5" strokeWidth={2} />
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
        <div className="min-h-screen bg-bg-primary pt-16">
            {/* Back Button */}
            <div className="absolute top-20 left-4 sm:left-6 z-50">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(-1)}
                    className="bg-bg-secondary hover:bg-bg-tertiary text-text-primary px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2 border border-border-default hover:border-accent-primary"
                >
                    <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                    <span>Quay lại</span>
                </motion.button>
            </div>

            {/* Hero Section */}
            <MovieHero
                movie={movieDetail}
                onPlayTrailer={() => setIsTrailerOpen(true)}
            />

            {/* Content Section */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-6">
                    {/* Main Content */}
                    <MovieInfo movie={movieDetail} />
                    <ShowtimeSection
                        showtimes={movieDetail?.showtimes}
                        loading={false}
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
