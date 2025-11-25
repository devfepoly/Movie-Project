import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Search, Bell, User, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef(null);

    const navLinks = [
        { name: 'Home', path: '/', icon: Sparkles },
        { name: 'Movies', path: '/list-movie', icon: Film }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes - using layout effect to avoid warning
    useEffect(() => {
        return () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
    }, [location.pathname, isMenuOpen]);

    const isActive = (path) => location.pathname === path;

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass-effect shadow-lg shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            {/* Gradient Border Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-pink-500/50 to-transparent" />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 sm:h-24">
                    {/* Logo - Enhanced with Animation */}
                    <Link to="/" className="flex items-center gap-3 group relative z-10">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative bg-linear-to-br from-pink-500 to-purple-600 p-2.5 sm:p-3 rounded-xl">
                                <Film className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                            </div>
                        </motion.div>
                        <div className="hidden sm:block">
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                <span className="text-white">Cine</span>
                                <span className="gradient-text">Max</span>
                            </h1>
                            <p className="text-xs text-gray-400 font-medium tracking-wider">MOVIE BOOKING</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative group px-5 py-2.5"
                                >
                                    <div className="flex items-center gap-2 relative z-10">
                                        <Icon className="w-4 h-4" />
                                        <span className={`text-base font-semibold transition-colors duration-300 ${isActive(link.path)
                                            ? 'text-pink-400'
                                            : 'text-gray-300 group-hover:text-white'
                                            }`}>
                                            {link.name}
                                        </span>
                                    </div>
                                    {isActive(link.path) && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-lg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Search - Desktop */}
                        <div className="hidden lg:block">
                            <AnimatePresence mode="wait">
                                {isSearchOpen ? (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 320, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative overflow-hidden"
                                    >
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search movies, actors..."
                                            value={searchQuery}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            className="w-full pl-5 pr-12 py-3 bg-gray-800/90 backdrop-blur-sm border border-pink-500/30 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all duration-300"
                                        />
                                        <button
                                            onClick={toggleSearch}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-pink-400 transition-colors duration-300"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleSearch}
                                        className="p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                                    >
                                        <Search className="w-5 h-5" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Notifications */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden sm:block relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                        </motion.button>

                        {/* Sign In Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                        >
                            <User className="w-4 h-4" />
                            <span>Sign In</span>
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-2">
                                {/* Search - Mobile */}
                                <div className="relative mb-4">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search movies, actors..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all duration-300"
                                    />
                                </div>

                                {/* Nav Links - Mobile */}
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${isActive(link.path)
                                                ? 'bg-linear-to-r from-pink-500/20 to-purple-500/20 text-pink-400'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {link.name}
                                        </Link>
                                    );
                                })}

                                {/* Sign In - Mobile */}
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
                                    <User className="w-5 h-5" />
                                    Sign In
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
