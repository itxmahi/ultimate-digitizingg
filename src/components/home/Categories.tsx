"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scissors, Palette, Layers, Star, Zap, Cpu, ArrowUpRight } from "lucide-react";

const categories = [
  { name: "3D Puff", icon: <Layers size={32} />, count: "1,240+", color: "from-blue-500/20 to-blue-600/20", iconColor: "text-blue-400" },
  { name: "Applique", icon: <Palette size={32} />, count: "850+", color: "from-purple-500/20 to-purple-600/20", iconColor: "text-purple-400" },
  { name: "Cap Designs", icon: <Star size={32} />, count: "2,100+", color: "from-yellow-500/20 to-yellow-600/20", iconColor: "text-yellow-400" },
  { name: "Small Text", icon: <Scissors size={32} />, count: "1,500+", color: "from-green-500/20 to-green-600/20", iconColor: "text-green-400" },
  { name: "Custom Patches", icon: <Zap size={32} />, count: "3,400+", color: "from-red-500/20 to-red-600/20", iconColor: "text-red-400" },
  { name: "Jackets Back", icon: <Cpu size={32} />, count: "900+", color: "from-cyan-500/20 to-cyan-600/20", iconColor: "text-cyan-400" },
];

const Categories = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">Directory</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">ELITE <br /><span className="text-gradient">CATEGORIES.</span></h2>
          </div>
          <p className="text-muted-foreground text-xl max-w-sm font-medium leading-relaxed">
            Curated collections of high-precision digitizing across all industry standard niches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-10 bg-card rounded-[3.5rem] border border-white/5 hover:border-primary/40 transition-all cursor-pointer overflow-hidden shadow-sm"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-3xl bg-background border border-white/5 flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-500 ${cat.iconColor}`}>
                  {cat.icon}
                </div>
                
                <div className="flex justify-between items-end">
                   <div>
                      <h3 className="text-3xl font-black mb-3 group-hover:text-primary transition-colors">{cat.name}</h3>
                      <div className="flex items-center space-x-2">
                         <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                         <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{cat.count} Designs</span>
                      </div>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowUpRight size={20} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
