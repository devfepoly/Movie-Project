import React from 'react';
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
                    className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.1 }}
                        onClick={onClose}
                        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-md border border-white/10 hover:border-white/30 group z-10"
                    >
                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    </motion.button>

                    {/* Video Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl opacity-20 blur-2xl" />

                        {/* Video */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <div className="relative pt-[56.25%] bg-black">
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
                                        <Play className="w-16 h-16 text-gray-600" />
                                        <p className="text-gray-400 text-lg">Trailer không khả dụng</p>
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
