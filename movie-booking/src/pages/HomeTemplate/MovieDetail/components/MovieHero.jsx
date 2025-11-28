import { motion } from 'framer-motion';
import { Play, Calendar, Star, Clock } from 'lucide-react';

export default function MovieHero({ movie, onPlayTrailer }) {
    if (!movie) return null;

    return (
        <div className="relative w-full bg-bg-secondary border-b border-border-default">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url(${movie.hinhAnh})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(20px)',
                    }}
                />
                <div className="absolute inset-0 bg-bg-primary/80" />
            </div>

            {/* Content Container */}
            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Movie Poster */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                    >
                        <div className="relative group w-full lg:w-80">
                            <div className="relative rounded-xl overflow-hidden border border-border-default">
                                <img
                                    src={movie.hinhAnh}
                                    alt={movie.tenPhim}
                                    className="w-full h-auto object-cover"
                                />

                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <button
                                        onClick={onPlayTrailer}
                                        className="bg-accent-primary hover:bg-accent-hover p-4 rounded-full transition-colors duration-200 border border-accent-primary"
                                    >
                                        <Play className="w-8 h-8 text-white" fill="white" strokeWidth={2} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Movie Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        {/* Title */}
                        <h1 className="text-4xl lg:text-5xl font-semibold text-text-primary mb-6 leading-tight">
                            {movie.tenPhim}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            {/* Rating */}
                            <div className="flex items-center gap-2 bg-accent-secondary/10 px-4 py-2 rounded-full border border-accent-secondary/30">
                                <Star className="w-5 h-5 text-accent-secondary" fill="currentColor" strokeWidth={2} />
                                <span className="text-accent-secondary font-semibold text-base">{movie.danhGia}</span>
                                <span className="text-text-muted text-sm">/10</span>
                            </div>

                            {/* Release Date */}
                            <div className="flex items-center gap-2 bg-bg-tertiary px-4 py-2 rounded-full border border-border-default">
                                <Calendar className="w-5 h-5 text-text-muted" strokeWidth={2} />
                                <span className="text-text-secondary text-sm font-medium">
                                    {new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN')}
                                </span>
                            </div>

                            {/* Status */}
                            {movie.dangChieu && (
                                <div className="flex items-center gap-2 bg-accent-success/10 px-4 py-2 rounded-full border border-accent-success/30">
                                    <div className="w-2 h-2 bg-accent-success rounded-full animate-pulse" />
                                    <span className="text-accent-success text-sm font-medium">Đang Chiếu</span>
                                </div>
                            )}

                            {movie.sapChieu && (
                                <div className="flex items-center gap-2 bg-accent-info/10 px-4 py-2 rounded-full border border-accent-info/30">
                                    <Clock className="w-5 h-5 text-accent-info" strokeWidth={2} />
                                    <span className="text-accent-info text-sm font-medium">Sắp Chiếu</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-base leading-relaxed mb-8">
                            {movie.moTa}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={onPlayTrailer}
                                className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white text-base font-medium rounded-lg transition-colors duration-200 border border-accent-primary"
                            >
                                <Play className="w-5 h-5" fill="white" strokeWidth={2} />
                                <span>Xem Trailer</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
