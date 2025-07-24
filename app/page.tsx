"use client";

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from "../hooks/useLenis";

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  // Initialize Lenis smooth scrolling
    useLenis();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Clean Minimal Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-black" />
        
        {/* Aurora Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Aurora Layer 1 - Green/Blue */}
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-64 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.4) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Aurora Layer 2 - Purple/Pink */}
          <motion.div
            className="absolute top-32 right-1/4 w-80 h-48 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 40%, transparent 70%)',
              filter: 'blur(35px)',
            }}
            animate={{
              x: [0, -40, 60, 0],
              y: [0, 25, -15, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          {/* Aurora Layer 3 - Cyan/Blue */}
          <motion.div
            className="absolute top-10 left-1/2 w-72 h-56 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.4) 0%, rgba(99, 102, 241, 0.3) 40%, transparent 70%)',
              filter: 'blur(45px)',
            }}
            animate={{
              x: [0, 30, -50, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.3, 0.7, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
          
          {/* Floating Aurora Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? 'rgba(34, 197, 94, 0.6)' : 
                           i % 3 === 1 ? 'rgba(168, 85, 247, 0.6)' : 'rgba(6, 182, 212, 0.6)',
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 8)}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Subtle starfield */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Curved Horizon with White Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg
            viewBox="0 0 1200 300"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="horizonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main curved surface */}
            <path
              d="M0,300 Q600,180 1200,300 L1200,300 L0,300 Z"
              fill="url(#horizonGradient)"
            />
            
            {/* Glowing white outline */}
            <path
              d="M0,300 Q600,180 1200,300"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              filter="url(#glow)"
            />
            
            {/* Additional glow layer */}
            <path
              d="M0,300 Q600,180 1200,300"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="4"
              filter="url(#glow)"
            />
          </svg>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-20 min-h-screen flex items-center justify-center p-4"
        style={{ y: textY }}
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Alert */}
          {isSubmitted && (
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-4 flex items-center justify-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">Welcome to the future! We'll be in touch soon.</span>
              </div>
            </motion.div>
          )}

          {/* Main Heading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-6xl font-light text-white mb-2 leading-tight">
              Hesitation costs, Action scales.
            </h1>
            <h2 className="text-2xl md:text-6xl font-light text-white leading-tight">
              Choose wisely - {" "}
              <em className="italic font-light text-gray-300">now</em>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-10"
          >
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-lg mx-auto">
              Your golden door to the digital empire is right here..
              <br />
              Businesses that wait, fade. Those who act, dominate.
            </p>
          </motion.div>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2 bg-black/40 border border-white/20 rounded-lg overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  required
                  className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="px-6 py-3 bg-white text-gray-900 font-medium disabled:bg-gray-300 transition-all duration-300 text-sm hover:bg-gray-100"
                >
                  {isSubmitted ? '✨ Joined!' : 'Get Notified'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}