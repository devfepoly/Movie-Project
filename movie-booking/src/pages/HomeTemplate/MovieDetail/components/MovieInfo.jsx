import { motion } from 'framer-motion';
import { Calendar, Film, FileText } from 'lucide-react';

export default function MovieInfo({ movie }) {
    if (!movie) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-bg-secondary border border-border-default rounded-xl p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-default">
                <div className="p-2 bg-accent-primary/10 rounded-lg border border-accent-primary/30">
                    <FileText className="w-6 h-6 text-accent-primary" strokeWidth={2} />
                </div>
                <h2 className="text-2xl font-semibold text-text-primary">
                    Tổng Quan Phim
                </h2>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-bg-tertiary rounded-lg p-4 border border-border-default hover:border-accent-primary transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-accent-primary" strokeWidth={2} />
                        <span className="text-text-muted text-sm font-medium">Khởi Chiếu</span>
                    </div>
                    <p className="text-text-primary font-semibold text-lg">
                        {new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </p>
                </div>

                <div className="bg-bg-tertiary rounded-lg p-4 border border-border-default hover:border-accent-primary transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Film className="w-5 h-5 text-accent-primary" strokeWidth={2} />
                        <span className="text-text-muted text-sm font-medium">Mã Phim</span>
                    </div>
                    <p className="text-text-primary font-semibold text-lg">
                        #{movie.maPhim}
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">
                    Nội Dung
                </h3>
                <p className="text-text-secondary leading-relaxed text-base">
                    {movie.moTa}
                </p>
            </div>
        </motion.div>
    );
}
