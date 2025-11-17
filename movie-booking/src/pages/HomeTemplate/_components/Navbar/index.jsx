import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const searchInputRef = useRef(null);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/list-movie' },
        { name: 'About', path: '/about' }
    ];

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when location changes
    useEffect(() => {
        const timer = setTimeout(() => setIsMenuOpen(false), 0);
        return () => clearTimeout(timer);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    // Handle search
    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        if (query.trim()) {
            console.log('Searching for:', query);
        }
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-900/95'
            } backdrop-blur-md border-b border-gray-800`}>
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-4 group">
                        <div className="bg-pink-500 p-3 rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-wide">
                                Cine<span className="text-pink-500">Max</span>
                            </h1>
                            <p className="text-xs text-gray-400 font-normal mt-0.5 tracking-wide">Movie Booking</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative px-6 py-2 text-lg font-semibold transition-all duration-300 ${isActive(link.path)
                                    ? 'text-pink-500'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"></span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center gap-6">
                        {/* Enhanced Search */}
                        <div className="relative shrink-0 group">
                            <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                            <div className="relative flex items-center">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search movies, actors, genres..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-80 pl-6 pr-12 py-3.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:bg-gray-800 hover:border-gray-600 transition-all duration-300 shadow-lg"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            searchInputRef.current?.focus();
                                        }}
                                        className="absolute right-3 p-1.5 text-gray-500 hover:text-pink-500 hover:bg-pink-500/10 rounded-full transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* User Actions */}
                        <button className="relative p-3.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span>
                        </button>

                        <button className="px-8 py-3 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 transition-all duration-300 whitespace-nowrap">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                    <div className="space-y-3 pt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg font-medium text-base transition-all duration-300 ${isActive(link.path)
                                    ? 'bg-pink-500 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search movies, actors..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full pl-6 pr-4 py-3.5 bg-gray-800 border border-gray-700 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                                />
                            </div>
                            <button className="w-full px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 transition-all duration-300">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
