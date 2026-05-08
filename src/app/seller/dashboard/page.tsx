"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight,
  MoreHorizontal,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SellerDashboard = () => {
  const stats = [
    { name: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: <DollarSign size={24} />, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Total Orders", value: "1,245", change: "+12.5%", icon: <ShoppingBag size={24} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Total Customers", value: "892", change: "+18.2%", icon: <Users size={24} />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Avg. Order Value", value: "$36.33", change: "-2.4%", icon: <TrendingUp size={24} />, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  const recentOrders = [
    { id: "#8234", customer: "Alice Johnson", product: "Royal Floral Design", amount: "$45.00", status: "Completed", date: "2 mins ago" },
    { id: "#8235", customer: "Bob Smith", product: "Cyber Tech Patch", amount: "$29.99", status: "Processing", date: "15 mins ago" },
    { id: "#8236", customer: "Charlie Brown", product: "Gold Crest Emblem", amount: "$120.00", status: "Pending", date: "1 hour ago" },
    { id: "#8237", customer: "Diana Prince", product: "Vintage Shield", amount: "$55.00", status: "Completed", date: "3 hours ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-xl font-bold">Export Report</Button>
          <Button className="rounded-xl luxury-gradient border-none text-white shadow-lg font-bold">
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#0F172A] p-6 rounded-[1.5rem] border border-border shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-black ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{stat.name}</h3>
            <p className="text-2xl font-black mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] p-8 rounded-[2rem] border border-border">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black">Revenue Analytics</h2>
            <select className="bg-secondary/50 border-none rounded-lg px-3 py-1 text-xs font-bold focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] flex items-end justify-between gap-2">
            {[40, 60, 45, 90, 65, 85, 55, 75, 40, 60, 45, 90].map((h, i) => (
              <div key={i} className="flex-1 space-y-2 group cursor-pointer">
                <div className="relative h-full flex flex-col justify-end">
                   <div 
                    style={{ height: `${h}%` }} 
                    className="w-full bg-primary/10 group-hover:bg-primary transition-all rounded-t-lg relative"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${h*10}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-center text-muted-foreground font-bold">M{i+1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-[#0F172A] p-8 rounded-[2rem] border border-border">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black">Recent Orders</h2>
            <Button variant="ghost" size="icon"><MoreHorizontal size={20} /></Button>
          </div>
          <div className="space-y-6">
            {recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/50 rounded-2xl transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center font-bold text-xs text-primary">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{order.customer}</p>
                    <p className="text-[10px] text-muted-foreground">{order.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm">{order.amount}</p>
                  <p className="text-[10px] text-muted-foreground">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-8 rounded-xl font-bold border-dashed border-2">View All Orders</Button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
