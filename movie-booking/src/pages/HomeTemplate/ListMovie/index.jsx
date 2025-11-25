import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Sparkles, Grid3x3, List, SlidersHorizontal, Star } from 'lucide-react';
import Movie from './movie';
import { fetchListMovie } from './slice';
import { useDispatch, useSelector } from 'react-redux';

export default function ListMovie() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.listMovieReducer);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    if (!movies.data) return [];

    let filtered = movies.data;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(movie =>
        movie.tenPhim.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.danhGia - a.danhGia);
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) =>
        new Date(b.ngayKhoiChieu) - new Date(a.ngayKhoiChieu)
      );
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) =>
        a.tenPhim.localeCompare(b.tenPhim)
      );
    }

    return filtered;
  }, [movies.data, searchQuery, sortBy]);

  if (movies.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-pink-500 animate-pulse" />
        </div>
        <p className="text-xl text-gray-400 mt-6 font-semibold">Đang tải phim...</p>
      </div>
    );
  }

  if (movies.error) {
    return (
      <div className="text-center py-32 px-5">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
          <X className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-3xl text-red-500 font-bold mb-3">Đã có lỗi xảy ra</h2>
        <p className="text-lg text-gray-400">{movies.error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-pink-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-semibold text-gray-300">{filteredMovies.length} Movies Available</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-white">All </span>
              <span className="gradient-text">Movies</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Discover amazing movies from our collection
            </p>
          </div>
        </motion.div>

        {/* Advanced Search and Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-12"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />

          {/* Main Container */}
          <div className="relative glass-effect rounded-3xl p-6 sm:p-8 border border-white/20">
            {/* Search Section */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Enhanced Search Input */}
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search for movies, actors, directors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-14 py-4 bg-[#1A1A26] border-2 border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:bg-[#1F1F2E] transition-all duration-300 text-base"
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 rounded-full transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex gap-3">
                {/* Sort Dropdown */}
                <div className="relative flex-1 lg:flex-initial lg:min-w-[220px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-5 pr-12 py-4 bg-[#1A1A26] border-2 border-white/10 rounded-2xl text-white appearance-none cursor-pointer focus:outline-none focus:border-pink-500/50 transition-all duration-300 text-base font-medium"
                  >
                    <option value="default">🎬 Default Order</option>
                    <option value="rating">⭐ Top Rated</option>
                    <option value="date">📅 Latest Release</option>
                    <option value="name">🔤 A-Z</option>
                  </select>
                  <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle - Desktop */}
                <div className="hidden sm:flex gap-2 bg-[#1A1A26] border-2 border-white/10 rounded-2xl p-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid'
                      ? 'bg-linear-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'list'
                      ? 'bg-linear-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <List className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                {searchQuery ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full">
                      <span className="text-pink-400 font-bold text-sm">
                        {filteredMovies.length} results
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      for "{searchQuery}"
                    </span>
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-sm">
                      Showing <span className="text-white font-semibold">{filteredMovies.length}</span> movies
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Top Rated Available</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No movies found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className={`grid gap-6 sm:gap-8 ${viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
            }`}>
            {filteredMovies.map((movie) => (
              <Movie key={movie.maPhim} {...movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
