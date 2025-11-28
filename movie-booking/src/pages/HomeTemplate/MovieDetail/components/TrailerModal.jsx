import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

export default function TrailerModal({ isOpen, onClose, trailerUrl }) {
    // Extract YouTube video ID
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = getYouTubeId(trailerUrl);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.1 }}
                        onClick={onClose}
                        className="absolute top-6 right-6 bg-bg-secondary hover:bg-bg-tertiary text-text-primary p-3 rounded-lg transition-colors duration-200 border border-border-default hover:border-accent-primary group z-10"
                    >
                        <X className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" strokeWidth={2} />
                    </motion.button>

                    {/* Video Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Video */}
                        <div className="relative rounded-xl overflow-hidden border border-border-default">
                            <div className="relative pt-[56.25%] bg-bg-primary">
                                {videoId ? (
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                        title="Movie Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                        <Play className="w-16 h-16 text-text-muted" strokeWidth={2} />
                                        <p className="text-text-secondary text-lg">Trailer không khả dụng</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
