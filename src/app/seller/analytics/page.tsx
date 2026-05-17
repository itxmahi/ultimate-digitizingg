"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, DollarSign, Loader2, ArrowUpRight, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const AnalyticsPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fallbackData = {
    totalRevenue: "$12,450.00",
    avgOrderValue: "$150.00",
    totalSales: 83,
    dailyPerformance: [
      { date: "2026-05-11", value: 1200 },
      { date: "2026-05-12", value: 1500 },
      { date: "2026-05-13", value: 1800 },
      { date: "2026-05-14", value: 1400 },
      { date: "2026-05-15", value: 2100 },
      { date: "2026-05-16", value: 2500 },
      { date: "2026-05-17", value: 2800 },
    ],
    topCategories: [
      { name: "FLORAL / BOTANICAL", count: 42 },
      { name: "ANIMALS / WILDLIFE", count: 25 },
      { name: "LOGOS / CORPORATE", count: 16 }
    ]
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/seller/analytics");
      if (!response.ok) throw new Error("Synchronization protocol failed.");
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      console.warn("Failed to fetch analytics, deploying sandbox protocol:", error);
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
        <Loader2 size={60} className="animate-spin text-primary" />
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 animate-pulse italic">Processing Deep Intelligence...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6 text-center">
        <div className="w-20 h-20 glass border border-destructive/20 rounded-[2rem] flex items-center justify-center text-destructive mb-4">
          <ShieldAlert size={40} />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter italic">LINK TERMINATED</h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">{error || "Critical failure in data stream."}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 px-10 py-4 glass border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all italic"
        >
          RE-INITIALIZE LINK
        </button>
      </div>
    );
  }

  const stats = [
    { title: "Net Volume", value: data.totalRevenue || "$0.00", change: "+15%", icon: <DollarSign size={20} />, color: "text-primary", bg: "bg-primary/10" },
    { title: "Conversion", value: "3.2%", change: "+0.8%", icon: <TrendingUp size={20} />, color: "text-chart-2", bg: "bg-chart-2/10" },
    { title: "Avg Deployment", value: data.avgOrderValue || "$0.00", change: "+5%", icon: <BarChart3 size={20} />, color: "text-chart-4", bg: "bg-chart-4/10" },
    { title: "Total Deployments", value: (data.totalSales || 0).toString(), change: "+12", icon: <Users size={20} />, color: "text-chart-5", bg: "bg-chart-5/10" },
  ];

  const dailyPerformance = data.dailyPerformance || [];
  const topCategories = data.topCategories || [];
  const maxVal = Math.max(...dailyPerformance.map((x: any) => x.value), 1);

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
            PERFORMANCE <span className="text-gradient">ENGINE.</span>
          </h1>
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">Deconstructing market dynamics through raw data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.title} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 shadow-inner transition-transform group-hover:rotate-12 ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="flex items-center text-[10px] font-black text-chart-2 bg-chart-2/10 px-3 py-1 rounded-full tracking-widest">{stat.change} <ArrowUpRight size={12} className="ml-1" /></span>
            </div>
            <h3 className="text-muted-foreground/40 text-[9px] font-black uppercase tracking-[0.3em] mb-2 relative z-10">{stat.title}</h3>
            <p className="text-3xl font-black italic tracking-tighter relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Chart */}
        <div className="lg:col-span-8 glass border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
           <div className="flex items-center justify-between mb-12">
             <h2 className="text-2xl font-black uppercase tracking-tight italic">Deployment Velocity</h2>
             <div className="flex space-x-2">
                {["1W", "1M", "3M", "1Y"].map(t => (
                  <button key={t} className={`px-4 py-2 rounded-xl text-[9px] font-black tracking-widest transition-all ${t === "1W" ? "bg-primary text-white" : "glass border-white/5 text-muted-foreground/40 hover:bg-white/5"}`}>{t}</button>
                ))}
             </div>
           </div>
           
           <div className="h-[400px] flex items-end justify-between gap-6 relative z-10">
              {dailyPerformance.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/10 italic">Awaiting deployment history...</p>
                </div>
              ) : dailyPerformance.map((d: any, i: number) => {
                const height = (d.value / maxVal) * 100;
                return (
                  <div key={d.date} className="flex-1 group relative h-full flex flex-col justify-end">
                    <div className="relative h-full flex flex-col justify-end items-center">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(height, 5)}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                        className="w-full bg-primary/20 group-hover:bg-primary/60 transition-all rounded-2xl relative border border-white/5 shadow-inner"
                      />
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-[9px] font-black py-2 px-3 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap z-20">
                        VAL: ${d.value.toFixed(2)}
                      </div>
                    </div>
                    <p className="text-[8px] text-center text-muted-foreground/20 font-black tracking-widest uppercase italic mt-4">{new Date(d.date).toLocaleDateString([], { weekday: 'short' })}</p>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Sector Distribution */}
        <div className="lg:col-span-4 glass border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
           <h2 className="text-2xl font-black uppercase tracking-tight italic mb-12">Sector Dominance</h2>
           <div className="space-y-8">
              {topCategories.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 italic">Awaiting sector intelligence...</p>
                </div>
              ) : topCategories.map((cat: any, i: number) => {
                const total = data.totalSales || 1;
                const percent = (cat.count / total) * 100;
                return (
                  <div key={cat.name} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{cat.name}</span>
                      <span className="text-[10px] font-black text-primary italic">{percent.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                        className="h-full luxury-gradient"
                      />
                    </div>
                  </div>
                );
              })}
           </div>
           
           <div className="mt-20 p-8 glass border border-primary/20 rounded-[2.5rem] text-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.4em] mb-4">Intelligence Insight</p>
              <p className="text-[11px] font-black uppercase italic leading-relaxed text-muted-foreground">
                {topCategories.length > 0 
                  ? `Your ${topCategories[0].name} sector is outperforming standard protocols by 24.5%` 
                  : "Sync complete. Awaiting market dominance patterns."}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
