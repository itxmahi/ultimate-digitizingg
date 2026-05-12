"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scissors, Palette, Layers, Star, Zap, Cpu, ArrowUpRight } from "lucide-react";

const categories = [
  { name: "3D Puff", Icon: Layers, count: "1,240+", color: "from-blue-500/20 to-blue-600/20", iconColor: "text-blue-400" },
  { name: "Applique", Icon: Palette, count: "850+", color: "from-purple-500/20 to-purple-600/20", iconColor: "text-purple-400" },
  { name: "Cap Designs", Icon: Star, count: "2,100+", color: "from-yellow-500/20 to-yellow-600/20", iconColor: "text-yellow-400" },
  { name: "Small Text", Icon: Scissors, count: "1,500+", color: "from-green-500/20 to-green-600/20", iconColor: "text-green-400" },
  { name: "Custom Patches", Icon: Zap, count: "3,400+", color: "from-red-500/20 to-red-600/20", iconColor: "text-red-400" },
  { name: "Jackets Back", Icon: Cpu, count: "900+", color: "from-cyan-500/20 to-cyan-600/20", iconColor: "text-cyan-400" },
];

const Categories = () => {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      {/* Background Section Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-chart-2/[0.02] rounded-full blur-[180px] -z-10" />
      
      <div className="container max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 text-primary"
            >
               <Zap size={18} className="animate-pulse" fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">GLOBAL ASSET DIRECTORY</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase italic">ELITE <br /><span className="text-gradient NOT-italic">NICHES.</span></h2>
          </div>
          <p className="text-muted-foreground/40 text-lg md:text-xl max-w-sm font-medium leading-relaxed italic">
            Curated repositories of high-precision digitizing protocols across all industrial embroidery sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => {
            const Icon = cat.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative p-10 glass border border-white/5 hover:border-primary/40 transition-all duration-700 cursor-pointer overflow-hidden shadow-2xl rounded-[3rem]"
              >
                {/* Background Glow Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ${cat.iconColor} ring-4 ring-white/5`}>
                    <Icon size={24} />
                  </div>
                  
                  <div className="flex justify-between items-end">
                     <div className="space-y-3">
                        <h3 className="text-3xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors duration-500">{cat.name}</h3>
                        <div className="flex items-center space-x-3">
                           <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.8)] animate-pulse" />
                           <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em]">{cat.count} PROTOCOLS</span>
                        </div>
                     </div>
                     <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700">
                        <ArrowUpRight size={18} />
                     </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
