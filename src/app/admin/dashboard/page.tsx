"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ShieldCheck, 
  UserCheck, 
  AlertCircle,
  BarChart3,
  Search,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", value: "125,430", change: "+5.2%", icon: <Users size={20} /> },
    { label: "Total Sellers", value: "2,450", change: "+12.1%", icon: <UserCheck size={20} /> },
    { label: "Total Revenue", value: "$1.2M", change: "+8.4%", icon: <DollarSign size={20} /> },
    { label: "Pending Approvals", value: "45", change: "-2", icon: <AlertCircle size={20} /> },
  ];

  const pendingSellers = [
    { name: "John Doe", store: "JD Digitizing", date: "2 hours ago", status: "Pending" },
    { name: "Sarah Smith", store: "Sarah's Stitches", date: "5 hours ago", status: "Pending" },
    { name: "Mike Ross", store: "Pearson Art", date: "1 day ago", status: "Reviewing" },
  ];

  return (
    <div className="p-8 space-y-12 bg-[#F8FAFC] dark:bg-[#020617] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black">Admin Panel</h1>
          <p className="text-muted-foreground font-medium">Global platform overview and management.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-xl font-bold bg-white dark:bg-[#0F172A]">System Health</Button>
          <Button className="rounded-xl luxury-gradient border-none text-white shadow-lg font-black px-8 h-12">Platform Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0F172A] p-8 rounded-[2rem] border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                {stat.icon}
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] p-10 rounded-[3rem] border border-border shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black">Platform Growth</h2>
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-xs font-bold text-muted-foreground uppercase">Revenue</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chart-4 rounded-full" />
                  <span className="text-xs font-bold text-muted-foreground uppercase">Users</span>
               </div>
            </div>
          </div>
          {/* Chart visual placeholder */}
          <div className="h-[400px] flex items-end gap-4">
             {Array(15).fill(0).map((_, i) => (
               <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative cursor-pointer">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                    Day {i+1}: $4k
                  </div>
                  <div style={{ height: `${20 + Math.random() * 60}%` }} className="w-full bg-primary/10 group-hover:bg-primary transition-all rounded-xl" />
                  <div style={{ height: `${10 + Math.random() * 40}%` }} className="w-full bg-chart-4/10 group-hover:bg-chart-4 transition-all rounded-xl" />
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F172A] p-10 rounded-[3rem] border border-border shadow-sm">
          <h2 className="text-2xl font-black mb-8">Seller Approvals</h2>
          <div className="space-y-6">
            {pendingSellers.map((seller, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-secondary/30 rounded-3xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-white dark:bg-[#1E293B] rounded-2xl flex items-center justify-center font-black text-primary shadow-sm border border-border">
                      {seller.name.charAt(0)}
                   </div>
                   <div>
                      <p className="font-bold text-sm">{seller.name}</p>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">{seller.store}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full mb-1">{seller.status}</p>
                   <p className="text-[10px] text-muted-foreground font-bold">{seller.date}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-10 rounded-2xl h-14 font-black border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">View All Requests</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
