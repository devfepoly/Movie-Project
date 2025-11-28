import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Film, Sparkles, Star, ArrowLeft } from 'lucide-react';
import { authService, registerService, clearError } from './slice';

export default function Auth() {
    const [searchParams] = useSearchParams();
    const initialMode = useMemo(() => searchParams.get('mode') || 'login', [searchParams]);
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        email: '',
        soDt: '',
        maNhom: 'GP01',
        maLoaiNguoiDung: 'QuanTri'
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    // React 19 Optimization: useCallback prevents unnecessary re-renders
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            if (mode === 'login') {
                const result = await dispatch(authService({
                    taiKhoan: formData.taiKhoan,
                    matKhau: formData.matKhau
                })).unwrap();

                // Navigate to admin dashboard on success
                navigate('/admin/dashboard');
            } else {
                await dispatch(registerService(formData)).unwrap();
                // Auto switch to login after successful registration
                setMode('login');
            }
        } catch (err) {
            console.error('Auth error:', err);
        }
    }, [mode, formData, dispatch, navigate]);

    const handleModeSwitch = useCallback((newMode) => {
        setMode(newMode);
        setFormData({
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDt: '',
            maNhom: 'GP01',
            maLoaiNguoiDung: 'QuanTri'
        });
        dispatch(clearError());
    }, [dispatch]);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    return (
        <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-8 left-8 z-10 flex items-center gap-3 px-6 py-3 bg-[#1A1A2E] hover:bg-[#252539] text-white rounded-xl border-2 border-[#2A2A3E] hover:border-[#E50914] transition-all duration-200 group"
            >
                <ArrowLeft className="w-5 h-5 text-[#A0A0B8] group-hover:text-[#E50914] transition-colors" />
                <span className="text-base font-semibold text-[#A0A0B8] group-hover:text-white transition-colors">Back</span>
            </button>

            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#E50914] opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[#E50914] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#00B8D4] opacity-5 rounded-full blur-3xl"></div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 text-[#E50914] opacity-20">
                    <Star className="w-8 h-8" />
                </div>
                <div className="absolute bottom-32 left-32 text-[#FFB800] opacity-20">
                    <Sparkles className="w-10 h-10" />
                </div>
                <div className="absolute top-1/3 left-20 text-[#E50914] opacity-15">
                    <Film className="w-12 h-12" />
                </div>
            </div>

            {/* Main Container - Balanced */}
            <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Branding & Info */}
                <div className="hidden lg:flex flex-col justify-center space-y-8 pr-12">
                    {/* Logo & Brand */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#E50914] to-[#F40612] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E50914]/25">
                                <Film className="w-9 h-9 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white tracking-tight">CineMax</h1>
                                <p className="text-base text-[#A0A0B8] mt-1">Premium Movie Experience</p>
                            </div>
                        </div>

                        <div className="h-1 w-32 bg-gradient-to-r from-[#E50914] to-transparent rounded-full"></div>
                    </div>

                    {/* Welcome Message */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white leading-tight">
                            {mode === 'login' ? 'Welcome Back to Your Cinema' : 'Join the CineMax Community'}
                        </h2>
                        <p className="text-lg text-[#A0A0B8] leading-relaxed">
                            {mode === 'login'
                                ? 'Sign in to access exclusive features, book tickets, and enjoy personalized movie recommendations.'
                                : 'Create your account and discover a world of entertainment with thousands of movies and exclusive content.'}
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1A1A2E] rounded-xl flex items-center justify-center border border-[#2A2A3E]">
                                <Star className="w-6 h-6 text-[#FFB800]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Premium Content</h3>
                                <p className="text-sm text-[#A0A0B8]">Access to latest movies and shows</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1A1A2E] rounded-xl flex items-center justify-center border border-[#2A2A3E]">
                                <Sparkles className="w-6 h-6 text-[#00B8D4]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Personalized Experience</h3>
                                <p className="text-sm text-[#A0A0B8]">AI-powered recommendations</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1A1A2E] rounded-xl flex items-center justify-center border border-[#2A2A3E]">
                                <Film className="w-6 h-6 text-[#E50914]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Easy Booking</h3>
                                <p className="text-sm text-[#A0A0B8]">Quick ticket reservation system</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Auth Form - Wider & Taller */}
                <div className="w-full">
                    <div className="bg-[#1A1A2E] rounded-3xl border-2 border-[#2A2A3E] p-10 shadow-2xl">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center justify-center mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#E50914] rounded-xl flex items-center justify-center">
                                    <Film className="w-9 h-9 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white">CineMax</h1>
                                    <p className="text-sm text-[#A0A0B8]">Premium Experience</p>
                                </div>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
                            </h2>
                            <p className="text-base text-[#A0A0B8]">
                                {mode === 'login'
                                    ? 'Login to continue your movie journey'
                                    : 'Join us for an amazing experience'}
                            </p>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex gap-2 mb-8 bg-[#0F0F1A] rounded-2xl p-1.5">
                            <button
                                onClick={() => handleModeSwitch('login')}
                                className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-all duration-200 ${mode === 'login'
                                    ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/30'
                                    : 'text-[#A0A0B8] hover:text-white hover:bg-[#252539]'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => handleModeSwitch('register')}
                                className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-all duration-200 ${mode === 'register'
                                    ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/30'
                                    : 'text-[#A0A0B8] hover:text-white hover:bg-[#252539]'
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-8 p-5 bg-[#E50914] bg-opacity-10 border-2 border-[#E50914] border-opacity-30 rounded-2xl">
                                <p className="text-base text-[#E50914] font-medium">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Register Fields */}
                            {mode === 'register' && (
                                <>
                                    <div>
                                        <label className="block text-base font-bold text-white mb-3">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="hoTen"
                                            value={formData.hoTen}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            required
                                            disabled={loading}
                                            className="w-full bg-[#252539] border-2 border-[#2A2A3E] rounded-2xl px-8 py-8 text-xl text-white placeholder-[#6B6B85] focus:outline-none focus:border-[#E50914] hover:border-[#3A3A4E] transition-all duration-200 disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-base font-bold text-white mb-3">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            required
                                            disabled={loading}
                                            className="w-full bg-[#252539] border-2 border-[#2A2A3E] rounded-2xl px-8 py-8 text-xl text-white placeholder-[#6B6B85] focus:outline-none focus:border-[#E50914] hover:border-[#3A3A4E] transition-all duration-200 disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-base font-bold text-white mb-3">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="soDt"
                                            value={formData.soDt}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            required
                                            disabled={loading}
                                            className="w-full bg-[#252539] border-2 border-[#2A2A3E] rounded-2xl px-8 py-8 text-xl text-white placeholder-[#6B6B85] focus:outline-none focus:border-[#E50914] hover:border-[#3A3A4E] transition-all duration-200 disabled:opacity-50"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Username Field */}
                            <div>
                                <label className="block text-base font-bold text-white mb-3">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="taiKhoan"
                                    value={formData.taiKhoan}
                                    onChange={handleInputChange}
                                    placeholder="Enter your username"
                                    required
                                    disabled={loading}
                                    className="w-full bg-[#252539] border-2 border-[#2A2A3E] rounded-2xl px-8 py-8 text-xl text-white placeholder-[#6B6B85] focus:outline-none focus:border-[#E50914] hover:border-[#3A3A4E] transition-all duration-200 disabled:opacity-50"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-base font-bold text-white mb-3">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="matKhau"
                                        value={formData.matKhau}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        required
                                        disabled={loading}
                                        className="w-full bg-[#252539] border-2 border-[#2A2A3E] rounded-2xl px-8 pr-20 py-8 text-xl text-white placeholder-[#6B6B85] focus:outline-none focus:border-[#E50914] hover:border-[#3A3A4E] transition-all duration-200 disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        disabled={loading}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 text-[#6B6B85] hover:text-white transition-colors duration-200 p-2 disabled:opacity-50"
                                    >
                                        {showPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me / Forgot Password */}
                            {mode === 'login' && (
                                <div className="flex items-center justify-between pt-2">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded-lg border-2 border-[#2A2A3E] bg-[#252539] text-[#E50914] focus:ring-2 focus:ring-[#E50914]"
                                        />
                                        <span className="text-base text-[#A0A0B8] group-hover:text-white transition-colors font-medium">Remember me</span>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-base text-[#E50914] hover:text-[#F40612] font-bold transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#E50914] to-[#F40612] hover:from-[#F40612] hover:to-[#E50914] text-white text-xl font-bold px-8 py-6 rounded-2xl transition-all duration-300 border-2 border-[#E50914] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-[#E50914]/40 transform hover:scale-[1.02] mt-8"
                            >
                                {loading ? 'Processing...' : mode === 'login' ? 'Login to CineMax' : 'Create Your Account'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-8">
                            <div className="flex-1 h-px bg-[#2A2A3E]"></div>
                            <span className="text-lg text-[#6B6B85] font-semibold">OR CONTINUE WITH</span>
                            <div className="flex-1 h-px bg-[#2A2A3E]"></div>
                        </div>

                        {/* Social Login */}
                        <button
                            type="button"
                            className="w-full bg-transparent hover:bg-[#252539] text-white text-lg font-semibold px-8 py-5 rounded-2xl transition-all duration-200 border-2 border-[#2A2A3E] flex items-center justify-center gap-4 hover:border-[#3A3A4E] hover:shadow-lg"
                        >
                            <svg className="w-7 h-7" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        {/* Footer Link */}
                        <p className="text-center text-base text-[#6B6B85] mt-8">
                            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => handleModeSwitch(mode === 'login' ? 'register' : 'login')}
                                className="text-[#E50914] hover:text-[#F40612] font-bold transition-colors"
                            >
                                {mode === 'login' ? 'Create one now' : 'Login here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
