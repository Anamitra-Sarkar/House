'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  ArrowRight, 
  Home,
  Sun,
  Moon,
  Sparkles,
  CheckCircle
} from 'lucide-react';

export default function SignupPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      const user = { name, email, provider: 'password' };
      localStorage.setItem('authUser', JSON.stringify(user));
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900'
    }`}>
      
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070')`,
            filter: isDarkMode ? 'brightness(0.15) blur(2px)' : 'brightness(0.3) blur(1px)',
          }}
        />
        
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95' 
            : 'bg-gradient-to-br from-slate-50/98 via-blue-50/95 to-slate-100/98'
        }`} />
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 bg-transparent"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75" />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Home className="h-6 w-6 text-white" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl font-black">
                Luxe<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Home</span>
              </h1>
            </div>
          </Link>

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
      </motion.header>

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-screen px-6 pt-20">
        <motion.div
          className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-white/10 border-white/20' 
              : 'bg-white/70 border-white/30'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-4"
              style={{
                backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Join LuxeHome</span>
            </motion.div>
            
            <h1 className="text-3xl font-black mb-4">
              Create Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Premium Account
              </span>
            </h1>
            
            <p className={`text-lg ${
              isDarkMode ? 'text-white/70' : 'text-slate-600'
            }`}>
              Start your journey with AI-powered predictions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-white/90' : 'text-slate-700'
              }`}>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${
                    isDarkMode ? 'text-white/40' : 'text-slate-400'
                  }`} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-blue-400' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400'
                  } focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-white/90' : 'text-slate-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${
                    isDarkMode ? 'text-white/40' : 'text-slate-400'
                  }`} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-blue-400' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400'
                  } focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-white/90' : 'text-slate-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${
                    isDarkMode ? 'text-white/40' : 'text-slate-400'
                  }`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border transition-all duration-300 outline-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-blue-400' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400'
                  } focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${
                      isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-slate-400 hover:text-slate-600'
                    }`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${
                      isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-slate-400 hover:text-slate-600'
                    }`} />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-white/90' : 'text-slate-700'
              }`}>
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${
                    isDarkMode ? 'text-white/40' : 'text-slate-400'
                  }`} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border transition-all duration-300 outline-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-blue-400' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400'
                  } focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className={`h-5 w-5 ${
                      isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-slate-400 hover:text-slate-600'
                    }`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${
                      isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-slate-400 hover:text-slate-600'
                    }`} />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="terms" className={`text-sm ${
                isDarkMode ? 'text-white/70' : 'text-slate-600'
              }`}>
                I agree to the{' '}
                <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading || !agreed}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className={`text-sm ${
              isDarkMode ? 'text-white/60' : 'text-slate-500'
            }`}>
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}