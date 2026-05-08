"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 -z-10 bg-[#020617]">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-chart-4/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full glass border border-white/10 mb-10 shadow-2xl"
          >
            <Sparkles size={16} className="text-chart-4 animate-spin-slow" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground">
              Elite Embroidery Marketplace
            </span>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center text-yellow-500">
               <Star size={12} fill="currentColor" />
               <span className="text-[10px] font-black ml-1">4.9/5</span>
            </div>
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12"
          >
            STITCH <br />
            <span className="text-gradient">PERFECTION.</span>
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground/80 mb-14 leading-relaxed font-medium"
          >
            The world's premier digital ecosystem for high-end embroidery designs. 
            Connect with elite digitizers or transform your vision into thread.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg"
          >
            <Link href="/marketplace" className="w-full">
              <Button size="lg" className="w-full h-16 md:h-20 px-12 rounded-[2rem] text-xl font-black luxury-gradient border-none text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105 hover:-translate-y-1 transition-all active:scale-95 group">
                EXPLORE NOW
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link href="/custom-stitch" className="w-full">
              <Button size="lg" variant="outline" className="w-full h-16 md:h-20 px-12 rounded-[2rem] text-xl font-black glass-dark border-white/10 hover:bg-white/5 transition-all text-white">
                CUSTOM ORDER
              </Button>
            </Link>
          </motion.div>

          {/* Featured In / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 pt-12 border-t border-white/5 w-full max-w-4xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { label: "DESIGNS", value: "250K+" },
                 { label: "ARTISTS", value: "1,200+" },
                 { label: "COUNTRIES", value: "150+" },
                 { label: "REVIEWS", value: "50K+" },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center">
                    <span className="text-3xl font-black text-foreground">{stat.value}</span>
                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest mt-2">{stat.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] hidden xl:block"
      >
        <div className="p-4 glass rounded-3xl border-primary/20 rotate-12 shadow-2xl">
           <Zap size={32} className="text-primary" />
        </div>
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[10%] hidden xl:block"
      >
        <div className="p-4 glass rounded-3xl border-chart-4/20 -rotate-12 shadow-2xl">
           <ShieldCheck size={32} className="text-chart-4" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
