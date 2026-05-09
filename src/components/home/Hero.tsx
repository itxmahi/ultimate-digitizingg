"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-40 pb-32 overflow-hidden bg-[#020617]">
      {/* Cinematic Background Infrastructure */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[900px] h-[900px] bg-chart-4/10 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Elite Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-4 px-8 py-3.5 rounded-full glass border border-white/5 mb-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] scale-90 md:scale-100"
          >
            <div className="flex items-center text-primary">
               <Zap size={14} className="animate-pulse" fill="currentColor" />
               <span className="text-[10px] font-black tracking-[0.5em] uppercase ml-3 italic">SYSTEM ONLINE</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div className="flex items-center space-x-2">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Verified Assets</span>
               <div className="flex items-center text-chart-4">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-black ml-1">TOP TIER</span>
               </div>
            </div>
          </motion.div>
          
          {/* Responsive Headline - Refined for "Professional Size" */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-16 uppercase italic"
          >
            STITCH <br />
            <span className="text-gradient NOT-italic">PERFECTION.</span>
          </motion.h1>
          
          {/* Cinematic Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground/40 mb-20 leading-relaxed font-black uppercase tracking-tight italic"
          >
            THE GLOBAL COMMAND CENTER FOR HIGH-END EMBROIDERY ARCHITECTURE. 
            CONNECT WITH ELITE DIGITIZERS OR INITIALIZE YOUR VISION.
          </motion.p>

          {/* Professional Sized CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-xl"
          >
            <Link href="/marketplace" className="w-full">
              <Button size="lg" className="w-full h-20 px-12 rounded-2xl text-[10px] font-black tracking-[0.3em] luxury-gradient border-none text-white shadow-[0_30px_70px_rgba(37,99,235,0.4)] hover:scale-105 transition-all active:scale-95 group uppercase italic">
                EXPLORE DIRECTORY
                <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
              </Button>
            </Link>
            <Link href="/custom-stitch" className="w-full">
              <Button size="lg" variant="outline" className="w-full h-20 px-12 rounded-2xl text-[10px] font-black tracking-[0.3em] glass border-white/10 hover:bg-white/5 transition-all text-white uppercase italic">
                CUSTOM PROTOCOL
              </Button>
            </Link>
          </motion.div>

          {/* Industrial Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="mt-32 pt-16 border-t border-white/5 w-full max-w-4xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
               {[
                 { label: "ELITE DESIGNS", value: "250K+" },
                 { label: "VERIFIED ARTISTS", value: "1,200+" },
                 { label: "GLOBAL HUBS", value: "150+" },
                 { label: "SUCCESS RATIO", value: "99.9%" },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-black text-foreground tracking-tighter uppercase italic">{stat.value}</span>
                    <span className="text-[9px] font-black text-muted-foreground/40 tracking-[0.4em] mt-3 uppercase">{stat.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Industrial Elements - Scale down for professional look */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [12, 15, 12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[5%] hidden xl:block pointer-events-none opacity-10"
      >
        <div className="p-8 glass rounded-[3rem] border-primary/20 shadow-2xl">
           <Zap size={48} className="text-primary" fill="currentColor" />
        </div>
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [-12, -15, -12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[5%] hidden xl:block pointer-events-none opacity-10"
      >
        <div className="p-8 glass rounded-[3rem] border-chart-4/20 shadow-2xl">
           <ShieldCheck size={48} className="text-chart-4" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
