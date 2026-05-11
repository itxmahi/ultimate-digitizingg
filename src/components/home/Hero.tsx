"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, Star, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Hero = () => {
  const { data: session, status } = useSession();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-40 pb-32 overflow-hidden bg-[#020617]">
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
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-6 px-10 py-4 rounded-full glass border border-white/5 mb-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group cursor-default"
          >
            <div className="flex items-center text-primary">
               <Zap size={14} className="animate-pulse" fill="currentColor" />
               <span className="text-[10px] font-black tracking-[0.5em] uppercase ml-4 italic">V1.0 LIVE</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div className="flex items-center space-x-3">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-foreground transition-colors">Elite Network</span>
               <div className="flex items-center text-chart-4">
                  <Star size={12} fill="currentColor" className="animate-spin-slow" />
                  <span className="text-[10px] font-black ml-2 tracking-widest">TOP TIER</span>
               </div>
            </div>
          </motion.div>
          
          {/* Responsive Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[12rem] font-black tracking-tighter leading-[0.75] mb-12 uppercase italic relative z-10">
              STITCH <br />
              <span className="text-gradient NOT-italic">PERFECTION.</span>
            </h1>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
          
          {/* Cinematic Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg md:text-2xl text-muted-foreground/50 mb-20 leading-relaxed font-black uppercase tracking-tight italic"
          >
            THE GLOBAL COMMAND CENTER FOR HIGH-END EMBROIDERY ARCHITECTURE. 
            CONNECT WITH ELITE DIGITIZERS OR INITIALIZE YOUR VISION WITH OUR <span className="text-primary">ELITE PROTOCOL.</span>
          </motion.p>

          {/* Professional Sized CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-2xl"
          >
            <Link href={status === "authenticated" ? "/seller/dashboard" : "/register"} className="w-full sm:w-1/2 group">
              <Button size="lg" className="w-full h-24 px-12 rounded-[2rem] text-[11px] font-black tracking-[0.4em] luxury-gradient border-none text-white shadow-[0_30px_70px_rgba(37,99,235,0.4)] hover:scale-105 hover:shadow-[0_40px_90px_rgba(37,99,235,0.6)] transition-all duration-500 active:scale-95 uppercase italic">
                {status === "authenticated" ? "GO TO DASHBOARD" : "GET STARTED"}
                <Sparkles size={16} className="ml-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link href="/marketplace" className="w-full sm:w-1/2 group">
              <Button size="lg" variant="outline" className="w-full h-24 px-12 rounded-[2rem] text-[11px] font-black tracking-[0.4em] glass border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-500 text-white uppercase italic">
                EXPLORE HUB
                <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {status !== "authenticated" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16"
            >
              <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 hover:text-primary transition-colors italic">
                Already a member? <span className="text-primary underline decoration-2 underline-offset-8">Authorize Access</span>
              </Link>
            </motion.div>
          )}

          {/* Industrial Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="mt-32 pt-20 border-t border-white/5 w-full max-w-5xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
               {[
                 { label: "ELITE DESIGNS", value: "250K+" },
                 { label: "VERIFIED ARTISTS", value: "1,200+" },
                 { label: "GLOBAL HUBS", value: "150+" },
                 { label: "SUCCESS RATIO", value: "99.9%" },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center group">
                    <span className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase italic group-hover:text-primary transition-colors duration-500">{stat.value}</span>
                    <span className="text-[10px] font-black text-muted-foreground/30 tracking-[0.5em] mt-5 uppercase italic group-hover:text-muted-foreground/60 transition-colors duration-500">{stat.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Industrial Elements */}
      <motion.div 
        animate={{ y: [0, -40, 0], rotate: [12, 20, 12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[8%] hidden xl:block pointer-events-none opacity-[0.15]"
      >
        <div className="p-10 glass rounded-[4rem] border-primary/30 shadow-2xl backdrop-blur-2xl">
           <Zap size={64} className="text-primary" fill="currentColor" />
        </div>
      </motion.div>
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [-12, -20, -12] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[8%] hidden xl:block pointer-events-none opacity-[0.15]"
      >
        <div className="p-10 glass rounded-[4rem] border-chart-4/30 shadow-2xl backdrop-blur-2xl">
           <ShieldCheck size={64} className="text-chart-4" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
