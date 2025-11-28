import { motion } from 'framer-motion';
import { Play, Star, Calendar, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Movie({ maPhim, tenPhim, hinhAnh, moTa, ngayKhoiChieu, danhGia }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="group bg-bg-secondary border border-border-default rounded-xl overflow-hidden hover:border-accent-primary transition-all duration-200"
        >
            {/* Movie Poster */}
            <div className="relative aspect-2/3 overflow-hidden bg-bg-tertiary">
                <img 
                    src={hinhAnh} 
                    alt={tenPhim}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Link
                        to={`/movie-detail/${maPhim}`}
                        className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white text-base font-medium rounded-lg transition-colors duration-200 border border-accent-primary"
                    >
                        <Play className="w-5 h-5" strokeWidth={2} />
                        <span>View Details</span>
                    </Link>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-accent-secondary/90 border border-accent-secondary">
                    <Star className="w-4 h-4 text-bg-primary" strokeWidth={2} />
                    <span className="text-sm font-medium text-bg-primary">{danhGia}</span>
                </div>
            </div>

            {/* Movie Info */}
            <div className="p-4">
                {/* Title */}
                <h4 className="text-xl font-semibold text-text-primary mb-2 line-clamp-1">
                    {tenPhim}
                </h4>

                {/* Release Date */}
                <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-text-muted" strokeWidth={2} />
                    <span className="text-sm text-text-muted">
                        {formatDate(ngayKhoiChieu)}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                    {moTa || 'No description available'}
                </p>

                {/* Book Button */}
                <Link
                    to={`/movie-detail/${maPhim}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-primary hover:bg-accent-hover text-white text-base font-medium rounded-lg transition-colors duration-200 border border-accent-primary"
                >
                    <Ticket className="w-5 h-5" strokeWidth={2} />
                    <span>Book Now</span>
                </Link>
            </div>
        </motion.div>
    );
}
