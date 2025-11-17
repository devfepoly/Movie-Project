import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 */}
                <div className="relative mb-12">
                    <h1 className="text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 leading-none animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-ping"></div>
                    </div>
                </div>

                {/* Movie Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-gray-800 p-6 rounded-2xl">
                            <svg className="w-20 h-20 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
                    The page you're looking for seems to have gone to another dimension.
                    <br className="hidden md:block" />
                    Don't worry, we'll help you find your way back!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Link>

                    <Link
                        to="/list-movie"
                        className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg border-2 border-gray-700 hover:border-pink-500 hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Browse Movies
                    </Link>
                </div>

                {/* Fun Error Codes */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                        { code: '404', label: 'Not Found' },
                        { code: '500', label: 'Server Error' },
                        { code: '403', label: 'Forbidden' },
                        { code: '401', label: 'Unauthorized' }
                    ].map((error) => (
                        <div
                            key={error.code}
                            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-pink-500 transition-all duration-300"
                        >
                            <p className="text-2xl font-bold text-pink-500 mb-1">{error.code}</p>
                            <p className="text-xs text-gray-400">{error.label}</p>
                        </div>
                    ))}
                </div>

                {/* Footer Text */}
                <p className="mt-12 text-sm text-gray-500">
                    Need help? Contact our{' '}
                    <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                        support team
                    </a>
                </p>
            </div>
        </div>
    );
}
