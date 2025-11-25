import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ChevronDown, Ticket, Calendar } from 'lucide-react';

export default function ShowtimeSection({ showtimes, loading }) {
    const [openTheater, setOpenTheater] = useState(null);

    if (loading) {
        return (
            <div className="bg-[#13172B]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/5">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-500"></div>
                </div>
            </div>
        );
    }

    if (!showtimes || !showtimes.heThongRapChieu || showtimes.heThongRapChieu.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#13172B]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                    <div className="p-2.5 bg-pink-500/10 rounded-xl">
                        <Ticket className="w-6 h-6 text-pink-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Lịch Chiếu</h2>
                </div>
                <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Chưa có lịch chiếu</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#13172B]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-xl"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="p-2.5 bg-pink-500/10 rounded-xl">
                    <Ticket className="w-6 h-6 text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Lịch Chiếu</h2>
            </div>

            {/* Theater Systems */}
            <div className="space-y-3">
                {showtimes.heThongRapChieu.map((heThong, index) => (
                    <motion.div
                        key={heThong.maHeThongRap}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    >
                        <TheaterSystem
                            heThong={heThong}
                            openTheater={openTheater}
                            setOpenTheater={setOpenTheater}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function TheaterSystem({ heThong, openTheater, setOpenTheater }) {
    return (
        <div className="bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-pink-500/30 transition-all">
            {/* Theater Header */}
            <div className="p-4 flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-lg p-2 shrink-0">
                    <img
                        src={heThong.logo}
                        alt={heThong.tenHeThongRap}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base truncate">
                        {heThong.tenHeThongRap}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {heThong.cumRapChieu?.length || 0} rạp chiếu
                    </p>
                </div>
            </div>

            {/* Theater Locations */}
            {heThong.cumRapChieu?.map((cumRap) => (
                <TheaterLocation
                    key={cumRap.maCumRap}
                    cumRap={cumRap}
                    openTheater={openTheater}
                    setOpenTheater={setOpenTheater}
                />
            ))}
        </div>
    );
}

function TheaterLocation({ cumRap, openTheater, setOpenTheater }) {
    const isOpen = openTheater === cumRap.maCumRap;

    return (
        <div className="border-t border-white/5">
            <button
                onClick={() => setOpenTheater(isOpen ? null : cumRap.maCumRap)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
                <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                    <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate group-hover:text-pink-400 transition-colors">
                            {cumRap.tenCumRap}
                        </h4>
                        <p className="text-gray-500 text-xs truncate">{cumRap.diaChi}</p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-pink-400 transition-colors" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-black/20">
                            {cumRap.lichChieuPhim && cumRap.lichChieuPhim.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                                    {cumRap.lichChieuPhim.map((lichChieu) => (
                                        <ShowtimeButton key={lichChieu.maLichChieu} lichChieu={lichChieu} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4 text-sm">Không có lịch chiếu</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ShowtimeButton({ lichChieu }) {
    const date = new Date(lichChieu.ngayChieuGioChieu);
    const time = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const dateStr = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/50 rounded-lg p-3 transition-all group overflow-hidden"
        >
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-all" />
            <div className="relative flex flex-col items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-pink-400 group-hover:text-pink-300 transition-colors" />
                <span className="text-white font-bold text-sm">{time}</span>
                <span className="text-gray-500 text-xs">{dateStr}</span>
            </div>
        </motion.button>
    );
}
