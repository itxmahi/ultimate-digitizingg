"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  PlusCircle, 
  MessageSquare,
  Bell,
  Search,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", href: "/seller/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", href: "/seller/products", icon: <Package size={20} /> },
    { name: "Orders", href: "/seller/orders", icon: <ShoppingBag size={20} /> },
    { name: "Customers", href: "/seller/customers", icon: <Users size={20} /> },
    { name: "Analytics", href: "/seller/analytics", icon: <BarChart3 size={20} /> },
    { name: "Messages", href: "/seller/messages", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-chart-4/5 rounded-full blur-[100px] -z-10" />

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full transition-all duration-700 z-50 p-4 ${isSidebarOpen ? "w-72" : "w-24"}`}>
        <div className="h-full glass border border-white/10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="p-8 mb-10 flex items-center space-x-4 relative z-10">
            <div className="w-12 h-12 luxury-gradient rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl transition-transform hover:rotate-12 duration-500">
              <span className="text-white font-black text-2xl italic tracking-tighter">S</span>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter text-gradient leading-none uppercase">Studio</span>
                <span className="text-[9px] font-black tracking-[0.3em] text-muted-foreground/60 mt-1 uppercase">Management</span>
              </div>
            )}
          </div>

          <nav className="flex-1 px-4 space-y-3 relative z-10">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                      : "text-muted-foreground/60 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 luxury-gradient"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                  {isSidebarOpen && <span className="relative z-10 font-black text-[11px] uppercase tracking-widest leading-none">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 space-y-3 relative z-10 mt-auto border-t border-white/5 bg-white/[0.02]">
            <Link href="/seller/settings" className="flex items-center space-x-4 px-5 py-4 text-muted-foreground/60 hover:text-foreground hover:bg-white/5 rounded-2xl transition-all duration-500">
              <Settings size={20} />
              {isSidebarOpen && <span className="font-black text-[11px] uppercase tracking-widest leading-none">Settings</span>}
            </Link>
            <button 
              onClick={() => signOut()}
              className="w-full flex items-center space-x-4 px-5 py-4 text-destructive/60 hover:text-destructive hover:bg-destructive/5 rounded-2xl transition-all duration-500"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-black text-[11px] uppercase tracking-widest leading-none">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-700 min-h-screen ${isSidebarOpen ? "ml-72" : "ml-24"}`}>
        {/* Elite Dashboard Header */}
        <header className="h-24 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center space-x-8">
             <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-12 h-12 glass border border-white/10 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-500 shadow-xl"
             >
                <ChevronRight className={`transition-transform duration-500 ${isSidebarOpen ? "rotate-180" : ""}`} />
             </button>
             
             <div className="relative hidden md:flex items-center group">
                <Search size={16} className="absolute left-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Analyze markets, orders..." 
                  className="bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-[11px] font-black tracking-widest uppercase w-72 focus:w-96 focus:ring-2 ring-primary/20 transition-all duration-700 outline-none placeholder:text-muted-foreground/20"
                />
             </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <button className="relative w-12 h-12 glass border border-white/10 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-500 shadow-xl group">
                <Bell size={18} />
                <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-ping" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
              </button>
              <Link href="/seller/products/new">
                <button className="w-12 h-12 glass border border-white/10 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-500 shadow-xl">
                  <PlusCircle size={18} />
                </button>
              </Link>
            </div>

            <div className="h-10 w-[1px] bg-white/10" />

            <div className="flex items-center space-x-4 cursor-pointer group p-1.5 pr-5 rounded-2xl hover:bg-white/5 transition-all duration-500">
               <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={session?.user?.image || "https://i.pravatar.cc/100"} alt="User" className="relative z-10 w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-primary/40 transition-all duration-500 shadow-2xl" />
               </div>
               <div className="flex flex-col text-left">
                  <p className="text-xs font-black tracking-tight leading-none uppercase">{session?.user?.name || "STUDIO USER"}</p>
                  <div className="flex items-center mt-1.5">
                    <div className="w-1.5 h-1.5 bg-chart-2 rounded-full mr-2" />
                    <span className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">Elite Partner</span>
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* Global Stats Ribbon (Sub-header) */}
        <div className="px-8 pb-4">
           <div className="glass border border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-4/5" />
              <div className="relative z-10 flex items-center space-x-12">
                 {[
                   { label: "Daily Volume", val: "$1,240.50", trend: "+12%" },
                   { label: "Active Orders", val: "24", trend: "Normal" },
                   { label: "Buyer Pulse", val: "98%", trend: "High" }
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{stat.label}</span>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-black tracking-tight mr-3">{stat.val}</span>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${stat.trend.includes('+') ? 'bg-chart-2/10 text-chart-2' : 'bg-white/5 text-muted-foreground'}`}>{stat.trend}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="relative z-10 flex items-center space-x-3">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden shadow-xl">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
                 <span className="text-[10px] font-black text-muted-foreground tracking-widest ml-2">+12 ACTIVE NOW</span>
              </div>
           </div>
        </div>

        {/* Main Viewport Content */}
        <div className="p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
