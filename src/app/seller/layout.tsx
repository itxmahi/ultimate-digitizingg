"use client";

import React, { useState } from "react";
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

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
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
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-foreground">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-[#0F172A] border-r border-border transition-all duration-300 z-40 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-6 mb-8 flex items-center space-x-3">
          <div className="w-10 h-10 luxury-gradient rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tight">STUDIO</span>}
        </div>

        <nav className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 w-full px-4 space-y-2">
          <Link href="/seller/settings" className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:bg-secondary rounded-xl transition-all">
            <Settings size={20} />
            {isSidebarOpen && <span className="font-bold text-sm">Settings</span>}
          </Link>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/5 rounded-xl transition-all">
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-border sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronRight className={`transition-transform ${isSidebarOpen ? "rotate-180" : ""}`} />
             </Button>
             <div className="relative hidden md:block">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search analytics, orders..." 
                  className="bg-secondary/50 border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 ring-primary/20 transition-all"
                />
             </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer group">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">John Digitizer</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Elite Seller</p>
               </div>
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop" alt="User" className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
