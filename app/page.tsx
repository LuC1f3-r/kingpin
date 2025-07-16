"use client";

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Enhanced Starfield Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(white_0.5px,transparent_0.5px)] bg-[size:100px_100px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(white_0.3px,transparent_0.3px)] bg-[size:150px_150px] animate-pulse delay-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(21,122,189,0.3)_0.5px,transparent_0.5px)] bg-[size:80px_80px] animate-pulse delay-2000"></div>
      </div>

      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Animated Grid Background */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Success Alert */}
        {isSubmitted && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-lg p-4 flex items-center justify-center space-x-2 shadow-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Welcome to the Empire! Your golden door awaits.</span>
            </div>
          </motion.div>
        )}

        {/* Main Heading with Enhanced Animation */}
        <div className="mb-12">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              delay: 0.2 
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <motion.span 
              className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Coming Soon
            </motion.span>
          </motion.h1>

          {/* Power Message Section */}
          <motion.div
            className="mb-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.8 
            }}
          >
            {/* First Power Statement */}
            <motion.div 
              className="relative group cursor-default"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 group-hover:border-orange-500/30 transition-all duration-500">
                <motion.p 
                  className="text-2xl md:text-3xl font-bold text-white leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <motion.span 
                    className="text-red-400"
                    whileHover={{ 
                      textShadow: "0 0 20px rgba(248, 113, 113, 0.8)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Hesitation costs,
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-green-400"
                    whileHover={{ 
                      textShadow: "0 0 20px rgba(74, 222, 128, 0.8)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Action scales.
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-yellow-400"
                    whileHover={{ 
                      textShadow: "0 0 20px rgba(250, 204, 21, 0.8)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Choose wisely – <span className="text-white font-black">NOW.</span>
                  </motion.span>
                </motion.p>
              </div>
            </motion.div>

            {/* Golden Door Statement */}
            <motion.div 
              className="relative group cursor-default"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 1.6 
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.03, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-6 group-hover:border-yellow-500/50 transition-all duration-500">
                <motion.p 
                  className="text-xl md:text-2xl font-semibold mb-4"
                  whileHover={{ 
                    textShadow: "0 0 30px rgba(251, 191, 36, 0.6)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent font-bold">
                    Your Golden Door to the Digital Empire is Right Here.
                  </span>
                </motion.p>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-300 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.6 }}
                >
                  <motion.span 
                    className="text-red-300"
                    whileHover={{ 
                      color: "#fca5a5",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Businesses that wait, fade.
                  </motion.span>
                  {" "}
                  <motion.span 
                    className="text-blue-300"
                    whileHover={{ 
                      color: "#93c5fd",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Those who act, dominate.
                  </motion.span>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 2.4 
            }}
          >
            Something revolutionary is on its way. Join the waitlist to secure your early access.
          </motion.p>
        </div>

        {/* Enhanced Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 2.8 
          }}
        >
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Enhanced Email Input */}
              <motion.div 
                className="flex-1 relative"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Mail className="h-5 w-5 text-blue-400" />
                </motion.div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to claim your spot"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15 hover:border-blue-400/50 shadow-lg focus:shadow-blue-500/25 focus:shadow-xl"
                />
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitted}
                className="px-8 py-4 bg-[#157abd] hover:bg-[#1489d1] disabled:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg backdrop-blur-md border border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/25 hover:shadow-xl relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(21, 122, 189, 0.4), 0 10px 10px -5px rgba(21, 122, 189, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
                <span className="relative z-10">
                  {isSubmitted ? 'Welcome to the Empire!' : 'Claim Your Spot'}
                </span>
              </motion.button>
            </div>
          </form>

          {/* Enhanced Additional Info */}
          <motion.p 
            className="text-gray-500 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 3.2 
            }}
            whileHover={{
              color: "#9ca3af",
              transition: { duration: 0.3 }
            }}
          >
            Join the elite. Be the first to dominate. No spam, unsubscribe anytime.
          </motion.p>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <motion.div 
          className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-3 h-3 bg-purple-400 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.7, 1, 0.7],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-2 w-1 h-1 bg-indigo-400 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 0.9, 0.4],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>
    </div>
  );
}