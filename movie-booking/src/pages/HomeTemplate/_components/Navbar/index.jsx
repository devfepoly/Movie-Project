import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, User, Menu, X } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/list-movie' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
                ? 'bg-bg-primary/95 backdrop-blur-sm border-b border-border-default'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-accent-primary p-2 rounded-lg transition-all duration-200 group-hover:bg-accent-hover border border-accent-primary">
                            <Film className="w-6 h-6 text-white" strokeWidth={2} />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-2xl font-semibold text-text-primary">
                                CineMax
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-200 border ${isActive(link.path)
                                    ? 'bg-accent-primary text-white border-accent-primary'
                                    : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary border-transparent'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Sign In Button - Desktop */}
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="hidden sm:flex items-center gap-2 px-6 py-2 bg-transparent hover:bg-bg-tertiary text-text-primary text-base font-medium rounded-lg transition-all duration-200 border border-border-default hover:border-accent-primary"
                        >
                            <User className="w-5 h-5" strokeWidth={2} />
                            <span>Sign In</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-all duration-200 border border-border-default"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden overflow-hidden border-t border-border-default"
                        >
                            <div className="py-4 space-y-2">
                                {/* Nav Links - Mobile */}
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-lg font-medium text-base transition-all duration-200 border ${isActive(link.path)
                                            ? 'bg-accent-primary text-white border-accent-primary'
                                            : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary border-transparent'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {/* Sign In - Mobile */}
                                <button
                                    onClick={() => {
                                        navigate('/auth/login');
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 mt-4 bg-transparent hover:bg-bg-tertiary text-text-primary font-medium rounded-lg transition-all duration-200 border border-border-default hover:border-accent-primary"
                                >
                                    <User className="w-5 h-5" strokeWidth={2} />
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
