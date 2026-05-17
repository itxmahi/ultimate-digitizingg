"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SellerDashboard = () => {
  const fallbackStats = [
    { name: "NET VOLUME", value: "$12,450.00", change: "+15.2%", icon: "DollarSign", color: "text-primary", bg: "bg-primary/10" },
    { name: "ACTIVE ORDERS", value: "8", change: "+25.1%", icon: "ShoppingBag", color: "text-chart-2", bg: "bg-chart-2/10" },
    { name: "LOYAL CLIENTS", value: "83", change: "+12.4%", icon: "Users", color: "text-chart-4", bg: "bg-chart-4/10" },
    { name: "SALES VELOCITY", value: "98%", change: "+5.3%", icon: "TrendingUp", color: "text-chart-5", bg: "bg-chart-5/10" },
  ];
  
  const fallbackOrders = [
    { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", customer: "Ahmad Raza", product: "Elite Gold Crest", amount: "$120.00", date: new Date().toISOString() },
    { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", customer: "Zainab Bano", product: "Silver Lotus", amount: "$85.50", date: new Date().toISOString() },
    { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", customer: "John Doe", product: "Neon Skull DST", amount: "$150.00", date: new Date().toISOString() },
  ];

  const fallbackChart = [40, 65, 50, 85, 70, 95, 80];

  const [data, setData] = useState<any>({
    stats: fallbackStats,
    recentOrders: fallbackOrders,
    chartData: fallbackChart
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/seller/stats");
      const result = await response.json();
      if (result && result.stats && result.stats.length > 0) {
        setData(result);
      } else {
        setData({
          stats: fallbackStats,
          recentOrders: fallbackOrders,
          chartData: fallbackChart
        });
      }
    } catch (error) {
      console.warn("Failed to fetch dashboard data, implementing secure client sandbox mode:", error);
      setData({
        stats: fallbackStats,
        recentOrders: fallbackOrders,
        chartData: fallbackChart
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "DollarSign": return <DollarSign size={22} />;
      case "ShoppingBag": return <ShoppingBag size={22} />;
      case "Users": return <Users size={22} />;
      case "TrendingUp": return <TrendingUp size={22} />;
      default: return <DollarSign size={22} />;
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
        <Loader2 size={60} className="animate-spin text-primary" />
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 animate-pulse">Syncing with global network...</p>
      </div>
    );
  }

  const stats = data?.stats || [];
  const recentOrders = data?.recentOrders || [];
  const chartData = data?.chartData || [];

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Hero Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
            DASHBOARD <span className="text-gradient">CENTRAL.</span>
          </h1>
          <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.4em] italic">
            Analyzing global embroidery markets in real-time
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="h-14 px-8 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
            Generate Insight Report
          </Button>
          <Link href="/seller/products/new">
            <Button className="h-14 px-8 rounded-2xl luxury-gradient border-none text-white shadow-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all italic">
              <Plus size={16} className="mr-3" />
              Deploy Asset
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass border border-white/5 p-8 rounded-[2.5rem] shadow-2xl group transition-all duration-500 hover:border-white/20"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner transition-transform group-hover:rotate-12 ${stat.bg} ${stat.color}`}>
                {getIcon(stat.icon)}
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${stat.change.startsWith('+') ? 'bg-chart-2/10 text-chart-2' : 'bg-destructive/10 text-destructive'}`}>
                {stat.change} <ArrowUpRight size={12} className="ml-1" />
              </div>
            </div>
            <h3 className="text-muted-foreground/60 text-[9px] font-black uppercase tracking-[0.3em] mb-2">{stat.name}</h3>
            <p className="text-3xl font-black tracking-tighter italic">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Analytics Section */}
        <div className="lg:col-span-8 glass border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
          
          <div className="flex items-center justify-between mb-12 relative z-10">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight uppercase italic">Revenue Velocity</h2>
              <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mt-1">Growth trajectory over time</span>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 text-[10px] font-black uppercase tracking-widest focus:ring-2 ring-primary/20 outline-none transition-all cursor-pointer">
              <option>Real-time Stream</option>
              <option>Last 30 Sessions</option>
              <option>Fiscal Quarter</option>
            </select>
          </div>
          
          <div className="h-[350px] flex items-end justify-between gap-4 relative z-10">
            {chartData.map((h: number, i: number) => (
              <div key={i} className="flex-1 space-y-4 group cursor-pointer h-full flex flex-col justify-end">
                <div className="relative h-full flex flex-col justify-end items-center">
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="w-full bg-white/5 group-hover:bg-primary/40 transition-all rounded-2xl relative border border-white/5 shadow-inner"
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-[9px] font-black py-2 px-3 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap z-20">
                      VAL: ${h*12}.50
                    </div>
                  </motion.div>
                </div>
                <p className="text-[9px] text-center text-muted-foreground/40 font-black tracking-widest uppercase italic">P{i+1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Feed (Recent Orders) */}
        <div className="lg:col-span-4 glass border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight uppercase italic">Live Feed</h2>
              <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mt-1">Global order ingestion</span>
            </div>
            <button className="w-10 h-10 glass border border-white/10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all"><MoreHorizontal size={18} /></button>
          </div>
          
          <div className="space-y-5">
            {recentOrders.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 italic">Awaiting first ingestion...</p>
              </div>
            ) : recentOrders.map((order: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between p-5 glass border border-transparent hover:border-white/10 rounded-[2rem] transition-all duration-500 cursor-pointer group"
              >
                <div className="flex items-center space-x-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src={order.img || "https://i.pravatar.cc/100"} className="relative z-10 w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10" />
                  </div>
                  <div>
                    <p className="font-black text-[11px] uppercase tracking-tight leading-none mb-1.5">{order.customer}</p>
                    <p className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-widest truncate max-w-[100px]">{order.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm tracking-tighter italic text-primary">{order.amount}</p>
                  <p className="text-[9px] text-muted-foreground/40 font-black uppercase tracking-[0.2em] mt-1 italic">{new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <Link href="/seller/orders">
            <Button variant="outline" className="w-full h-16 mt-10 rounded-2xl border-white/5 border-dashed border-2 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
              Analyze All Operations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
