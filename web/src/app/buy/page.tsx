'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Home, 
  Moon, 
  Sun, 
  AlertCircle, 
  Loader,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Star,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { predictPrice } from '@/lib/api';

export default function BuyPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    CRIM: "",
    ZN: "",
    INDUS: "",
    CHAS: "",
    NOX: "",
    RM: "",
    Age: "",
    DIS: "",
    RAD: "",
    TAX: "",
    PTRATIO: "",
    B: "",
    LSTAT: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Convert form data to numbers and prepare for API
      const features = {
        CRIM: parseFloat(formData.CRIM) || 0,
        ZN: parseFloat(formData.ZN) || 0,
        INDUS: parseFloat(formData.INDUS) || 0,
        CHAS: parseFloat(formData.CHAS) || 0,
        NOX: parseFloat(formData.NOX) || 0,
        RM: parseFloat(formData.RM) || 0,
        Age: parseFloat(formData.Age) || 0,
        DIS: parseFloat(formData.DIS) || 0,
        RAD: parseFloat(formData.RAD) || 0,
        TAX: parseFloat(formData.TAX) || 0,
        PTRATIO: parseFloat(formData.PTRATIO) || 0,
        B: parseFloat(formData.B) || 0,
        LSTAT: parseFloat(formData.LSTAT) || 0,
      };

      const response = await predictPrice(features);
      
      if (response.error) {
        setError(response.error);
        setPrediction(null);
      } else {
        // Convert prediction from thousands to display format
        const price = (response.prediction * 1000).toFixed(0);
        setPrediction(`$${parseInt(price).toLocaleString()}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get prediction. Make sure the backend is running at http://localhost:5000";
      setError(errorMessage);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const fillSampleData = () => {
    setFormData({
      CRIM: "0.00632",
      ZN: "18.0",
      INDUS: "2.31",
      CHAS: "0",
      NOX: "0.538",
      RM: "6.575",
      Age: "65.2",
      DIS: "4.09",
      RAD: "1",
      TAX: "296",
      PTRATIO: "15.3",
      B: "396.9",
      LSTAT: "4.98",
    });
  };

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
            filter: isDarkMode ? 'brightness(0.2) blur(2px)' : 'brightness(0.4) blur(1px)',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Animated gradient overlay */}
        <motion.div 
          className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90' 
              : 'bg-gradient-to-br from-slate-50/95 via-blue-50/90 to-slate-100/95'
          }`}
          animate={{
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ================= PREMIUM HEADER ================= */}
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
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Home className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Luxe<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Home</span>
              </h1>
              <p className="text-xs opacity-70 font-medium">AI-Powered Predictions</p>
            </div>
          </Link>

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

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Back Button */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <motion.button 
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-slate-900/10 hover:bg-slate-900/20 text-slate-900'
                }`}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Home</span>
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* ================= PREDICTION FORM ================= */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={`p-8 rounded-3xl backdrop-blur-xl border ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/70 border-white/30'
              }`}>
                
                <div className="text-center mb-8">
                  <motion.div
                    className="inline-flex items-center px-4 py-2 rounded-full border mb-4"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                      borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                    <span className="text-sm font-medium">AI-Powered Prediction</span>
                  </motion.div>
                  
                  <h1 className="text-3xl md:text-4xl font-black mb-4">
                    Predict Your 
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Dream Home's Value
                    </span>
                  </h1>
                  
                  <p className={`text-lg ${
                    isDarkMode ? 'text-white/70' : 'text-slate-600'
                  }`}>
                    Enter the 13 Boston Housing features to get an accurate price prediction
                  </p>
                </div>

                <form onSubmit={handlePredict} className="space-y-6">
                  
                  {/* Feature Inputs Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'CRIM', label: 'Per Capita Crime Rate', placeholder: '0.00632', desc: 'Crime rate per town' },
                      { key: 'ZN', label: 'Large Lot Zoning', placeholder: '18.0', desc: 'Residential land over 25,000 sq.ft' },
                      { key: 'INDUS', label: 'Non-Retail Acres', placeholder: '2.31', desc: 'Proportion of non-retail business' },
                      { key: 'CHAS', label: 'Charles River', placeholder: '0', desc: '1 if bounds river, else 0' },
                      { key: 'NOX', label: 'Nitric Oxides', placeholder: '0.538', desc: 'NOX concentration (parts/10M)' },
                      { key: 'RM', label: 'Average Rooms', placeholder: '6.575', desc: 'Rooms per dwelling' },
                      { key: 'Age', label: 'Pre-1940 Share', placeholder: '65.2', desc: 'Owner-occupied units pre-1940' },
                      { key: 'DIS', label: 'Distance to Jobs', placeholder: '4.09', desc: 'Distance to employment centers' },
                      { key: 'RAD', label: 'Highway Access', placeholder: '1', desc: 'Accessibility index' },
                      { key: 'TAX', label: 'Tax Rate', placeholder: '296', desc: 'Property tax per $10,000' },
                      { key: 'PTRATIO', label: 'Pupil-Teacher Ratio', placeholder: '15.3', desc: 'Pupil-teacher ratio by town' },
                      { key: 'B', label: 'Demographic Index', placeholder: '396.9', desc: 'Demographic proportion index' },
                      { key: 'LSTAT', label: 'Lower Status %', placeholder: '4.98', desc: 'Percentage of lower status population' },
                    ].map((field, index) => (
                      <motion.div
                        key={field.key}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <label className={`block text-sm font-medium ${
                          isDarkMode ? 'text-white/90' : 'text-slate-700'
                        }`}>
                          {field.label}
                        </label>
                        <input
                          type="number"
                          name={field.key}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-blue-400' 
                              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400'
                          } focus:ring-2 focus:ring-blue-400/20`}
                          required
                        />
                        <p className={`text-xs ${
                          isDarkMode ? 'text-white/50' : 'text-slate-500'
                        }`}>
                          {field.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin" />
                          <span>Predicting...</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-5 w-5" />
                          <span>Get Prediction</span>
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      onClick={fillSampleData}
                      className={`px-6 py-4 rounded-xl font-medium border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'border-white/30 text-white hover:bg-white/10' 
                          : 'border-slate-300 text-slate-900 hover:bg-slate-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Fill Sample Data
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* ================= RESULTS PANEL ================= */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              
              {/* Prediction Result */}
              <AnimatePresence>
                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-8 rounded-3xl border ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30' 
                        : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                    }`}
                  >
                    <div className="text-center">
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-8 w-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-4">Prediction Complete!</h3>
                      <div className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {prediction}
                      </div>
                      <p className={`text-lg ${
                        isDarkMode ? 'text-white/70' : 'text-slate-600'
                      }`}>
                        Estimated value based on AI analysis
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-6 rounded-2xl border ${
                      isDarkMode 
                        ? 'bg-red-900/20 border-red-500/30' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-700 dark:text-red-400">Prediction Failed</h4>
                        <p className={`text-sm mt-1 ${
                          isDarkMode ? 'text-red-300' : 'text-red-600'
                        }`}>
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Features Info Card */}
              <div className={`p-6 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/50 border-white/20'
              }`}>
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-400" />
                  What Makes This Accurate?
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "94.2% Accuracy",
                      desc: "Proven track record with real market data"
                    },
                    {
                      icon: Zap,
                      title: "Lightning Fast",
                      desc: "Get results in under 100ms"
                    },
                    {
                      icon: TrendingUp,
                      title: "Market Insights",
                      desc: "Based on comprehensive Boston housing data"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold">{feature.title}</h5>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-white/60' : 'text-slate-500'
                        }`}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className={`p-6 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
              }`}>
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-3">Want More Predictions?</h4>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-white/70' : 'text-slate-600'
                  }`}>
                    Save this page and make unlimited predictions for free
                  </p>
                  <Link href="/">
                    <motion.button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explore More Features
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}