"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Views", value: "12,450", change: "+15%", icon: <Users size={20} />, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Conversion Rate", value: "3.2%", change: "+0.8%", icon: <TrendingUp size={20} />, color: "text-green-500", bg: "bg-green-500/10" },
          { title: "Total Revenue", value: "$4,250", change: "+25%", icon: <DollarSign size={20} />, color: "text-purple-500", bg: "bg-purple-500/10" },
          { title: "Active Listings", value: "45", change: "+2", icon: <BarChart3 size={20} />, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-xs font-black text-green-500">{stat.change}</span>
            </div>
            <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{stat.title}</h3>
            <p className="text-2xl font-black mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0F172A] p-8 rounded-[2rem] border border-border shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
        <BarChart3 size={48} className="text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-black mb-2">Detailed Analytics Coming Soon</h2>
        <p className="text-muted-foreground max-w-md">We are working on bringing you advanced charting and insights to help you grow your business.</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
