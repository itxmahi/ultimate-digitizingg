"use client";

import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import FlashSale from "@/components/home/FlashSale";
import Categories from "@/components/home/Categories";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, Users, Trophy, Zap, ShieldCheck, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-background overflow-hidden relative">
      {/* Universal Background Glow Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-chart-4/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] bg-chart-2/5 rounded-full blur-[160px]" />
      </div>

      <Hero />
      <FlashSale />
      <Categories />
      
      {/* Premium Seller Studio Showcase */}
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/[0.03] rounded-full blur-[180px] -z-10" />
        
        <div className="container max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full glass border border-primary/20 shadow-xl">
                 <Zap size={14} className="text-primary animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">THE DIGITIZER ELITE</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase italic">
                EMPOWER YOUR <br /><span className="text-gradient">CRAFT.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground/40 leading-relaxed font-medium max-w-xl italic">
                The **Seller Studio** is not just a dashboard; it's a high-performance ecosystem designed for the world's most elite digitizers to scale their empire globally.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { title: "Global Nexus", desc: "Instantly connect with high-tier buyers across every continent." },
                   { title: "Elite Analytics", desc: "Proprietary market insights and trend forecasting tools." },
                   { title: "Velocity Payouts", desc: "Industry-leading payment infrastructure for instant liquidity." },
                   { title: "VIP Access", desc: "Direct 1-on-1 support for our top-tier digitizing partners." }
                 ].map((item, i) => (
                   <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex space-x-4 group"
                   >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl glass border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                         <CheckCircle2 size={16} className="text-primary group-hover:text-white" />
                      </div>
                      <div>
                         <h4 className="font-black text-lg italic tracking-tight uppercase">{item.title}</h4>
                         <p className="text-[11px] text-muted-foreground/40 font-bold mt-1.5 leading-relaxed italic uppercase">{item.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>

              <Link href="/seller/register" className="inline-block pt-8 group">
                <Button size="lg" className="h-16 px-12 rounded-2xl luxury-gradient border-none text-white font-black text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all duration-500 uppercase italic">
                  LAUNCH YOUR STUDIO NOW <ArrowRight size={16} className="ml-4 group-hover:translate-x-3 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10 grid grid-cols-2 gap-8">
                 {[
                   { name: "AlphaStitch", sales: "25K+", rating: 5.0, img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" },
                   { name: "NeoDigit", sales: "18K+", rating: 4.9, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
                   { name: "EliteThreads", sales: "30K+", rating: 5.0, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop" },
                   { name: "StitchZen", sales: "12K+", rating: 4.8, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
                 ].map((seller, i) => (
                   <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`glass p-8 rounded-[3rem] border border-white/5 flex flex-col items-center text-center transition-all duration-700 shadow-2xl hover:border-primary/40 ${i % 2 !== 0 ? 'mt-12' : ''}`}
                   >
                      <div className="relative mb-6">
                        <img src={seller.img} alt={seller.name} className="relative z-10 w-24 h-24 rounded-2xl object-cover shadow-2xl ring-4 ring-white/5" />
                      </div>
                      <h4 className="font-black text-xl mb-2 tracking-tighter uppercase italic">{seller.name}</h4>
                      <div className="flex items-center text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full border border-primary/10">
                        <Star size={10} fill="currentColor" className="mr-2" />
                        <span className="text-[9px] font-black tracking-widest">{seller.rating} RATIO</span>
                      </div>
                      <p className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">{seller.sales} TRANSACTIONS</p>
                   </motion.div>
                 ))}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-primary/5 rounded-full -z-10 animate-spin-slow opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Stats - Professional Minimalist Glass */}
      <section className="py-32 md:py-48 relative">
        <div className="container max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users size={32} />, label: "ELITE CREATORS", value: "500K+" },
              { icon: <Trophy size={32} />, label: "PREMIUM ASSETS", value: "250K+" },
              { icon: <ShieldCheck size={32} />, label: "SECURITY RATE", value: "99.9%" },
              { icon: <Star size={32} />, label: "GLOBAL PARTNERS", value: "12K+" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="glass border border-white/5 p-12 rounded-[3rem] text-center flex flex-col items-center group transition-all duration-700 shadow-2xl hover:border-primary/20"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary mb-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 border border-white/5 shadow-inner">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-black mb-4 tracking-tighter italic uppercase">{stat.value}</h3>
                <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em] leading-none">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Premium Cinematic CTA */}
      <section className="py-40 md:py-60 relative overflow-hidden">
        <div className="container max-w-[1400px] mx-auto px-6">
          <div className="relative rounded-[5rem] overflow-hidden group shadow-[0_80px_150px_rgba(0,0,0,0.8)] border border-white/5">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-10 transition-all duration-2000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-30" />
               <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617]/95 to-primary/20" />
            </div>

            <div className="relative z-10 p-20 md:p-40 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto space-y-16"
              >
                <div className="space-y-8">
                  <div className="inline-flex items-center space-x-4 px-6 py-2 rounded-full glass border border-white/10 mb-4">
                     <Zap size={14} className="text-primary" fill="currentColor" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] italic text-primary">ELITE STATUS PENDING</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white">
                    JOIN THE <br /><span className="text-gradient NOT-italic">REVOLUTION.</span>
                  </h2>
                  <p className="text-lg md:text-2xl text-white/30 font-black max-w-2xl mx-auto leading-relaxed italic uppercase tracking-tight">
                    Step into the future of digital embroidery architecture. Experience the world's most advanced digitizing ecosystem built for elite performance.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                  <Link href="/register" className="w-full sm:w-auto group">
                    <Button size="lg" className="w-full h-24 px-16 bg-white text-black hover:bg-white/90 rounded-[2.5rem] text-[12px] font-black shadow-2xl transition-all duration-500 uppercase italic tracking-[0.4em] group-hover:scale-105 active:scale-95">
                      GET STARTED
                      <ArrowRight size={18} className="ml-4 group-hover:translate-x-3 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/custom-stitch" className="w-full sm:w-auto group">
                    <Button size="lg" variant="outline" className="w-full h-24 px-16 border-white/10 bg-white/5 hover:bg-white/10 rounded-[2.5rem] text-[12px] font-black text-white backdrop-blur-3xl transition-all duration-500 uppercase italic tracking-[0.4em] group-hover:border-white/20 active:scale-95">
                      ELITE SERVICES
                    </Button>
                  </Link>
                </div>

                <div className="pt-12">
                   <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">Authorized for professional use only // 2026 Ultimate Digitizing</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
