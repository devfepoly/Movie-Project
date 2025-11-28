import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ChevronDown, Ticket, Calendar } from 'lucide-react';

export default function ShowtimeSection({ showtimes, loading }) {
    const [openTheater, setOpenTheater] = useState(null);

    if (loading) {
        return (
            <div className="bg-bg-secondary border border-border-default rounded-xl p-8">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-border-default border-t-accent-primary"></div>
                </div>
            </div>
        );
    }

    if (!showtimes || !showtimes.heThongRapChieu || showtimes.heThongRapChieu.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-bg-secondary border border-border-default rounded-xl p-8"
            >
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-default">
                    <div className="p-2 bg-accent-primary/10 rounded-lg border border-accent-primary/30">
                        <Ticket className="w-6 h-6 text-accent-primary" strokeWidth={2} />
                    </div>
                    <h2 className="text-2xl font-semibold text-text-primary">Lịch Chiếu</h2>
                </div>
                <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={2} />
                    <p className="text-text-secondary text-lg">Chưa có lịch chiếu</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-bg-secondary border border-border-default rounded-xl p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-default">
                <div className="p-2 bg-accent-primary/10 rounded-lg border border-accent-primary/30">
                    <Ticket className="w-6 h-6 text-accent-primary" strokeWidth={2} />
                </div>
                <h2 className="text-2xl font-semibold text-text-primary">Lịch Chiếu</h2>
            </div>

            {/* Theater Systems */}
            <div className="space-y-3">
                {showtimes.heThongRapChieu.map((heThong, index) => (
                    <motion.div
                        key={heThong.maHeThongRap}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
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
        <div className="bg-bg-tertiary rounded-lg overflow-hidden border border-border-default">
            {/* Theater Header */}
            <div className="p-4 flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-lg p-2 shrink-0 border border-border-default">
                    <img
                        src={heThong.logo}
                        alt={heThong.tenHeThongRap}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-text-primary font-semibold text-base truncate">
                        {heThong.tenHeThongRap}
                    </h3>
                    <p className="text-text-muted text-sm">
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
        <div className="border-t border-border-default">
            <button
                onClick={() => setOpenTheater(isOpen ? null : cumRap.maCumRap)}
                className="w-full p-4 flex items-center justify-between hover:bg-bg-secondary transition-colors duration-200 group"
            >
                <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                    <MapPin className="w-5 h-5 text-accent-primary shrink-0" strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-text-primary font-medium text-sm truncate group-hover:text-accent-primary transition-colors duration-200">
                            {cumRap.tenCumRap}
                        </h4>
                        <p className="text-text-muted text-xs truncate">{cumRap.diaChi}</p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-text-muted group-hover:text-accent-primary transition-colors duration-200" strokeWidth={2} />
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
                        <div className="p-4 bg-bg-primary">
                            {cumRap.lichChieuPhim && cumRap.lichChieuPhim.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                                    {cumRap.lichChieuPhim.map((lichChieu) => (
                                        <ShowtimeButton key={lichChieu.maLichChieu} lichChieu={lichChieu} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-text-muted text-center py-4 text-sm">Không có lịch chiếu</p>
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
        <button className="bg-bg-tertiary hover:bg-accent-primary/10 border border-border-default hover:border-accent-primary rounded-lg p-3 transition-all duration-200 group">
            <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4 text-accent-primary" strokeWidth={2} />
                <span className="text-text-primary font-semibold text-sm">{time}</span>
                <span className="text-text-muted text-xs">{dateStr}</span>
            </div>
        </button>
    );
}
