import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Film, FileText } from 'lucide-react';

export default function MovieInfo({ movie }) {
    if (!movie) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#13172B]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-xl"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="p-2.5 bg-pink-500/10 rounded-xl">
                    <FileText className="w-6 h-6 text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                    Tổng Quan Phim
                </h2>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:border-pink-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-pink-400" />
                        <span className="text-gray-400 text-sm font-medium">Khởi Chiếu</span>
                    </div>
                    <p className="text-white font-semibold text-lg">
                        {new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </p>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:border-pink-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                        <Film className="w-4 h-4 text-pink-400" />
                        <span className="text-gray-400 text-sm font-medium">Mã Phim</span>
                    </div>
                    <p className="text-white font-semibold text-lg">
                        #{movie.maPhim}
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-300 uppercase tracking-wide">
                    Nội Dung
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                    {movie.moTa}
                </p>
            </div>
        </motion.div>
    );
}
