import { motion as M } from 'framer-motion';
import { Play, Star, Calendar, Ticket, TrendingUp, Info } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Movie({ maPhim, tenPhim, hinhAnh, moTa, trailer, ngayKhoiChieu, danhGia }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <M.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
        >
            {/* Outer Glow Effect */}
            <div className="absolute -inset-0.5 bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

            {/* Main Card */}
            <div className="relative bg-[#1A1A26] rounded-3xl overflow-hidden">
                {/* Image Container */}
                <div className="relative h-[460px] overflow-hidden">
                    {/* Image with zoom effect */}
                    <M.img
                        src={hinhAnh}
                        alt={tenPhim}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        animate={{
                            scale: isHovered ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    />

                    {/* Dark Overlay - Stronger on hover */}
                    <M.div
                        className="absolute inset-0 bg-black"
                        animate={{
                            opacity: isHovered ? 0.5 : 0.2,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#1A1A26] via-[#1A1A26]/50 to-transparent" />

                    {/* Top Info Bar */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20">
                        {/* Rating Badge */}
                        <M.div
                            className="flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-white/20"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                            <span className="text-white font-bold text-sm">{danhGia}</span>
                            <span className="text-gray-400 text-sm">/10</span>
                        </M.div>

                        {/* Trending Badge */}
                        <M.div
                            className="flex items-center gap-1.5 px-3 py-2 bg-pink-500/90 backdrop-blur-md rounded-full"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <TrendingUp className="w-3.5 h-3.5 text-white" />
                            <span className="text-white font-bold text-xs">HOT</span>
                        </M.div>
                    </div>

                    {/* Center Actions - Shows on Hover */}
                    <M.div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Play Trailer Button */}
                        <M.button
                            onClick={() => window.open(trailer, '_blank')}
                            className="relative group/play"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Pulsing Rings */}
                            <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-20" />
                            <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-40" />

                            {/* Button */}
                            <div className="relative w-20 h-20 bg-linear-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                                <Play className="w-8 h-8 ml-1 text-white" fill="currentColor" />
                            </div>
                        </M.button>

                        {/* Quick Detail Link */}
                        <Link to={`/movie/${maPhim}`}>
                            <M.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-6 py-3 glass-effect rounded-full border border-white/30 hover:border-pink-500/50 transition-all group/detail"
                            >
                                <div className="flex items-center gap-2">
                                    <Info className="w-4 h-4 text-white group-hover/detail:text-pink-400 transition-colors" />
                                    <span className="text-white font-semibold text-sm group-hover/detail:text-pink-400 transition-colors">
                                        Xem chi tiết
                                    </span>
                                    <M.span
                                        className="text-white group-hover/detail:text-pink-400"
                                        animate={{ x: isHovered ? [0, 3, 0] : 0 }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        →
                                    </M.span>
                                </div>
                            </M.button>
                        </Link>
                    </M.div>

                    {/* Bottom Info - Slides up on hover */}
                    <M.div
                        className="absolute bottom-0 left-0 right-0 p-6 z-20"
                        animate={{
                            y: isHovered ? 0 : 40,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="glass-effect rounded-2xl p-4 border border-white/10">
                            <div className="flex items-center gap-2 text-gray-300">
                                <Calendar className="w-4 h-4 text-pink-400" />
                                <span className="text-sm font-medium">
                                    {new Date(ngayKhoiChieu).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </M.div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 space-y-4 bg-linear-to-b from-[#1A1A26] to-[#13131A]">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white min-h-14 line-clamp-2 leading-tight">
                        <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                            {tenPhim}
                        </span>
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 min-h-10">
                        {moTa}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Detail Button */}
                        <Link to={`/movie/${maPhim}`}>
                            <M.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full group/btn overflow-hidden rounded-xl border-2 border-pink-500/30 hover:border-pink-500/60 transition-all"
                            >
                                {/* Background */}
                                <div className="absolute inset-0 bg-pink-500/10 group-hover/btn:bg-pink-500/20 transition-all" />

                                {/* Button Content */}
                                <div className="relative flex items-center justify-center gap-2 py-3.5 px-4">
                                    <Info className="w-5 h-5 text-pink-400" />
                                    <span className="text-pink-400 font-bold text-sm">Chi tiết</span>
                                </div>
                            </M.button>
                        </Link>

                        {/* Book Button */}
                        <M.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative w-full group/btn overflow-hidden rounded-xl"
                        >
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-600 to-cyan-500 animated-gradient" />

                            {/* Button Content */}
                            <div className="relative flex items-center justify-center gap-2 py-3.5 px-4">
                                <Ticket className="w-5 h-5 text-white" />
                                <span className="text-white font-bold text-sm">Đặt vé</span>
                            </div>

                            {/* Shine Effect */}
                            <M.div
                                className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                    x: isHovered ? ['0%', '100%'] : '0%',
                                }}
                                transition={{ duration: 0.6 }}
                            />
                        </M.button>
                    </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-pink-500/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </M.div>
    );
}
