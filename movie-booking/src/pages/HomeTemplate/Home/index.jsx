import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import Movie from '../ListMovie/movie';

// Generate random positions for particles outside component render
const particles = [...Array(20)].map(() => ({
  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
  yEnd: Math.random() * -100 - 50,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 2
}));

export default function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await axios({
          method: 'GET',
          url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
          headers: {
            TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk"
          },
        });
        setFeaturedMovies(result.data.content.slice(0, 8));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 animated-gradient opacity-20" />

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-500/30 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y
              }}
              animate={{
                y: [null, particle.yEnd],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-pink-500/30"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-semibold text-gray-300">Welcome to CineMax</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Unlimited</span>
              <br />
              <span className="gradient-text">Movies, TV Shows & More</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Watch anywhere. Cancel anytime. Ready to watch? Enter your email to create or restart your membership.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/list-movie">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
                >
                  <Play className="w-6 h-6" fill="currentColor" />
                  <span>Explore Movies</span>
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 glass-effect text-white font-bold text-lg rounded-full border border-white/20 hover:border-pink-500/50 transition-all duration-300"
              >
                <TrendingUp className="w-6 h-6" />
                <span>Trending Now</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-pink-500/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-pink-500 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Movies Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                Featured <span className="gradient-text">Movies</span>
              </h2>
              <p className="text-gray-400 text-lg">Discover the hottest movies right now</p>
            </div>
            <Link to="/list-movie">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-6 py-3 glass-effect text-white font-semibold rounded-full border border-pink-500/30 hover:border-pink-500 transition-all duration-300"
              >
                <span>View All</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Movies Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-pink-500 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {featuredMovies.map((movie) => (
                <Movie key={movie.maPhim} {...movie} />
              ))}
            </div>
          )}

          {/* View All Button - Mobile */}
          <Link to="/list-movie" className="sm:hidden">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 mt-8 px-6 py-4 glass-effect text-white font-semibold rounded-xl border border-pink-500/30 hover:border-pink-500 transition-all duration-300"
            >
              <span>View All Movies</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-pink-500/10 to-purple-500/10" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, label: 'Movies', value: '10K+' },
              { icon: TrendingUp, label: 'Active Users', value: '50K+' },
              { icon: Clock, label: 'Hours Watched', value: '1M+' },
              { icon: Sparkles, label: 'Countries', value: '150+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-3"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30">
                  <stat.icon className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</h3>
                  <p className="text-gray-400 font-medium mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
