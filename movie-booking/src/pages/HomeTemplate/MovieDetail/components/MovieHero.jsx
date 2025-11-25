import React from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Star, Clock, Sparkles } from 'lucide-react';

export default function MovieHero({ movie, onPlayTrailer }) {
    if (!movie) return null;

    return (
        <div className="relative w-full">
            {/* Background with Blur Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 scale-110 blur-2xl opacity-30"
                    style={{
                        backgroundImage: `url(${movie.hinhAnh})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-[#0A0E27]" />
            </div>

            {/* Content Container */}
            <div className="relative container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Movie Poster - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="shrink-0"
                    >
                        <div className="relative group w-full lg:w-80">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500" />

                            {/* Poster */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={movie.hinhAnh}
                                    alt={movie.tenPhim}
                                    className="w-full h-auto object-cover"
                                />

                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onPlayTrailer}
                                        className="bg-pink-600 hover:bg-pink-700 p-5 rounded-full shadow-2xl transition-colors"
                                    >
                                        <Play className="w-8 h-8 text-white" fill="white" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Movie Info - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        {/* Title */}
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {movie.tenPhim}
                        </h1>

                        {/* Meta Info Row */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            {/* Rating Badge */}
                            <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-yellow-500/30">
                                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                <span className="text-white font-bold text-base">{movie.danhGia}</span>
                                <span className="text-yellow-200/60 text-sm">/10</span>
                            </div>

                            {/* Release Date */}
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300 text-sm font-medium">
                                    {new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN')}
                                </span>
                            </div>

                            {/* Status Badges */}
                            {movie.dangChieu && (
                                <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-green-500/30">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-green-300 text-sm font-semibold">Đang Chiếu</span>
                                </div>
                            )}

                            {movie.sapChieu && (
                                <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-blue-500/30">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span className="text-blue-300 text-sm font-semibold">Sắp Chiếu</span>
                                </div>
                            )}

                            {movie.hot && (
                                <div className="flex items-center gap-2 bg-pink-500/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-pink-500/30">
                                    <Sparkles className="w-4 h-4 text-pink-400" />
                                    <span className="text-pink-300 text-sm font-semibold">HOT</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 max-w-3xl">
                            {movie.moTa}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onPlayTrailer}
                                className="relative px-8 py-4 bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <div className="relative flex items-center gap-2">
                                    <Play className="w-5 h-5" fill="white" />
                                    <span>Xem Trailer</span>
                                </div>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:border-white/40 transition-all"
                            >
                                Đặt Vé Ngay
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}