'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Home, 
  MapPin, 
  IndianRupee, 
  Bed, 
  Bath, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Menu, 
  X,
  Sun,
  Moon,
  Star,
  TrendingUp,
  Users,
  Award,
  Sparkles
} from 'lucide-react';

/**
 * PREMIUM HOUSE PRICE PREDICTION
 * Ultra-modern design with glassmorphism and premium aesthetics
 */

type StoredUser = {
  name: string;
  email?: string;
  avatar?: string;
  provider?: string;
};

const HomePage = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftEmail, setDraftEmail] = useState("");
  const [draftAvatar, setDraftAvatar] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("authUser") : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          setUser(parsed);
          setDraftName(parsed.name || "");
          setDraftEmail(parsed.email || "");
          setDraftAvatar(parsed.avatar || "");
        }
      } catch (_e) {
        setUser(null);
      }
    }
  }, []);

  const saveProfile = () => {
    const nextUser: StoredUser = {
      name: draftName || "User",
      email: draftEmail || undefined,
      avatar: draftAvatar || undefined,
      provider: user?.provider || "password",
    };
    localStorage.setItem("authUser", JSON.stringify(nextUser));
    setUser(nextUser);
    setShowProfileEditor(false);
  };

  const displayName = user?.name?.includes("@") ? user.name.split("@")[0] : user?.name;

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900'
    }`}>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070')`,
            filter: isDarkMode ? 'brightness(0.3) blur(1px)' : 'brightness(0.7) blur(0.5px)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Animated gradient overlay */}
        <motion.div 
          className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-slate-900/80' 
              : 'bg-gradient-to-r from-blue-100/80 via-purple-100/60 to-slate-100/80'
          }`}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDarkMode ? 'bg-white/20' : 'bg-slate-600/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* ================= PREMIUM NAVBAR ================= */}
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? isDarkMode 
              ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10' 
              : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Home className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Luxe<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Home</span>
              </h1>
              <p className="text-xs opacity-70 font-medium">AI-Powered Predictions</p>
            </div>
          </motion.div>

          <nav className={`hidden lg:flex items-center space-x-8 ${isDarkMode ? 'text-white/90' : 'text-slate-700'}`}>
            <Link href="#features" className="hover:text-blue-400 transition-colors duration-300 font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-blue-400 transition-colors duration-300 font-medium">
              How It Works
            </Link>
            <Link href="#pricing" className="hover:text-blue-400 transition-colors duration-300 font-medium">
              Pricing
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/settings" className="hover:text-blue-400 transition-colors duration-300 font-medium">
                  Settings
                </Link>
                <motion.button
                  onClick={() => setShowProfileEditor(true)}
                  className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {user.avatar ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400">
                      <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                      {user.name?.slice(0, 2) || "U"}
                    </div>
                  )}
                  <span className="font-medium">{displayName || "Profile"}</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="hover:text-blue-400 transition-colors duration-300 font-medium">
                  Login
                </Link>
                <Link href="/signup">
                  <motion.button 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-slate-900/10 hover:bg-slate-900/20 text-slate-900'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-8"
              style={{
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Powered by Advanced AI Technology</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-black leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Predict Your Dream
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Home's Value
              </span>
            </motion.h1>

            <motion.p 
              className={`text-xl md:text-2xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-white/80' : 'text-slate-600'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Harness the power of machine learning to get accurate house price predictions 
              based on comprehensive market data and advanced algorithms.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/buy">
                <motion.button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Predicting</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              
              <motion.button 
                onClick={() => setShowFeatures(true)}
                className={`px-10 py-4 rounded-2xl font-bold text-lg border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-slate-300 text-slate-900 hover:bg-slate-50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[
                { icon: TrendingUp, label: "Accuracy", value: "94.2%", desc: "Prediction accuracy" },
                { icon: Users, label: "Users", value: "10K+", desc: "Satisfied customers" },
                { icon: Award, label: "Trusted", value: "5★", desc: "User rating" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-2xl backdrop-blur-xl border ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-white/50 border-white/30'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="font-medium mb-1">{stat.label}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES MODAL ================= */}
      <AnimatePresence>
        {showFeatures && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFeatures(false)}
          >
            <motion.div
              className={`max-w-4xl w-full rounded-3xl p-8 border max-h-[80vh] overflow-y-auto ${
                isDarkMode 
                  ? 'bg-slate-900/95 border-white/20' 
                  : 'bg-white/95 border-slate-200'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Boston Housing Features</h2>
                  <p className={`${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                    All 13 features used in our AI model
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowFeatures(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: "CRIM", label: "Per Capita Crime Rate", desc: "Crime rate per town." },
                  { key: "ZN", label: "Large Lot Zoning", desc: "Residential land zoned for lots over 25,000 sq.ft." },
                  { key: "INDUS", label: "Non-Retail Acres", desc: "Proportion of non-retail business acres per town." },
                  { key: "CHAS", label: "Charles River", desc: "1 if tract bounds the river, otherwise 0." },
                  { key: "NOX", label: "Nitric Oxides", desc: "NOX concentration (parts per 10 million)." },
                  { key: "RM", label: "Average Rooms", desc: "Average number of rooms per dwelling." },
                  { key: "AGE", label: "Pre-1940 Share", desc: "Proportion of owner-occupied units built before 1940." },
                  { key: "DIS", label: "Distance to Jobs", desc: "Weighted distances to five Boston employment centers." },
                  { key: "RAD", label: "Highway Access", desc: "Accessibility index to radial highways." },
                  { key: "TAX", label: "Tax Rate", desc: "Property tax rate per $10,000." },
                  { key: "PTRATIO", label: "Pupil-Teacher Ratio", desc: "Pupil-teacher ratio by town." },
                  { key: "B", label: "Demographic Index", desc: "1000(Bk - 0.63)^2 where Bk is the proportion of Black residents." },
                  { key: "LSTAT", label: "Lower Status %", desc: "Percentage of lower status population." },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.key}
                    className={`p-4 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                        {feature.key}
                      </div>
                      <h4 className="font-semibold">{feature.label}</h4>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= PROFILE EDITOR ================= */}
      <AnimatePresence>
        {showProfileEditor && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileEditor(false)}
          >
            <motion.div
              className={`max-w-md w-full rounded-3xl p-8 border ${
                isDarkMode 
                  ? 'bg-slate-900/95 border-white/20' 
                  : 'bg-white/95 border-slate-200'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {user ? "Edit Profile" : "Create Account"}
                  </h2>
                  <p className={`${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                    Manage your account settings
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowProfileEditor(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white/80' : 'text-slate-700'
                  }`}>
                    Name
                  </label>
                  <input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                    } focus:border-blue-400`}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white/80' : 'text-slate-700'
                  }`}>
                    Email
                  </label>
                  <input
                    value={draftEmail}
                    onChange={(e) => setDraftEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                    } focus:border-blue-400`}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white/80' : 'text-slate-700'
                  }`}>
                    Avatar URL
                  </label>
                  <input
                    value={draftAvatar}
                    onChange={(e) => setDraftAvatar(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                    } focus:border-blue-400`}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    onClick={saveProfile}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save
                  </motion.button>
                  <motion.button
                    onClick={() => setShowProfileEditor(false)}
                    className={`flex-1 py-3 rounded-xl font-medium border transition-colors ${
                      isDarkMode 
                        ? 'border-white/20 text-white hover:bg-white/10' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>

                {user && (
                  <motion.button
                    onClick={() => {
                      localStorage.removeItem("authUser");
                      setUser(null);
                      setShowProfileEditor(false);
                      window.location.reload();
                    }}
                    className="w-full bg-red-500/10 border border-red-500/30 text-red-400 py-3 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Out
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LuxeHome
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-white/70' : 'text-slate-600'
            }`}>
              Experience the future of real estate predictions with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Advanced AI",
                description: "Powered by CatBoost machine learning algorithm with 94.2% accuracy",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: ShieldCheck,
                title: "Secure & Private",
                description: "Your data is protected with enterprise-grade security measures",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get predictions in milliseconds with our optimized infrastructure",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                description: "Real-time market analysis with comprehensive data visualization",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "24/7 customer support from real estate and AI experts",
                gradient: "from-indigo-500 to-blue-500"
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "Trusted by thousands of users with verified accuracy ratings",
                gradient: "from-red-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-3xl backdrop-blur-xl border hover:border-blue-400/50 transition-all duration-500 group ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/50 border-white/20 hover:bg-white/70'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-white/70' : 'text-slate-600'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              How It <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-white/70' : 'text-slate-600'
            }`}>
              Simple, transparent, and accurate price predictions in three easy steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Details",
                description: "Fill in the 13 Boston Housing features about the property you're interested in",
                icon: Search
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our CatBoost algorithm analyzes the data using advanced machine learning techniques",
                icon: Cpu
              },
              {
                step: "03",
                title: "Get Prediction",
                description: "Receive an accurate price prediction with detailed insights and market analysis",
                icon: TrendingUp
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-8">
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.icon && <step.icon className="w-10 h-10" />}
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-white/70' : 'text-slate-600'
                }`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className={`p-12 rounded-3xl backdrop-blur-xl border ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-white/20' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border-slate-200'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-8"
              style={{
                backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Predict Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dream Home's Value?
              </span>
            </h2>
            
            <p className={`text-xl mb-10 max-w-2xl mx-auto ${
              isDarkMode ? 'text-white/80' : 'text-slate-600'
            }`}>
              Join thousands of satisfied users who trust LuxeHome for accurate, AI-powered house price predictions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/buy">
                <motion.button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Free Prediction</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              
              <motion.button 
                className={`px-12 py-4 rounded-2xl font-bold text-lg border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-slate-300 text-slate-900 hover:bg-slate-50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className={`py-16 px-6 border-t ${
        isDarkMode 
          ? 'border-white/10 bg-slate-900/50' 
          : 'border-slate-200 bg-slate-50/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75" />
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black">
                    Luxe<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Home</span>
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                    AI-Powered Predictions
                  </p>
                </div>
              </div>
              <p className={`max-w-md ${
                isDarkMode ? 'text-white/70' : 'text-slate-600'
              }`}>
                Revolutionizing real estate with cutting-edge AI technology. 
                Get accurate house price predictions powered by machine learning.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className={`space-y-2 text-sm ${
                isDarkMode ? 'text-white/60' : 'text-slate-600'
              }`}>
                <li><Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="/buy" className="hover:text-blue-400 transition-colors">Try Now</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className={`space-y-2 text-sm ${
                isDarkMode ? 'text-white/60' : 'text-slate-600'
              }`}>
                <li><Link href="/help" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row items-center justify-between pt-8 border-t ${
            isDarkMode ? 'border-white/10' : 'border-slate-200'
          }`}>
            <p className={`text-sm mb-4 md:mb-0 ${
              isDarkMode ? 'text-white/60' : 'text-slate-500'
            }`}>
              © {new Date().getFullYear()} LuxeHome. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                <motion.a
                  key={social}
                  href={`#`}
                  className={`text-sm hover:text-blue-400 transition-colors ${
                    isDarkMode ? 'text-white/60' : 'text-slate-500'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;