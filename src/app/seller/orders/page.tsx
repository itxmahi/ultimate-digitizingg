"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Eye, Download, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([
    {
      id: "ord_f18e9a2b",
      user: { name: "Ahmad Raza", email: "ahmad@titan.com", phone: "+923451234567" },
      items: [ { product: { name: "Elite Gold Crest Precision" } } ],
      totalAmount: 120.00,
      status: "PROCESSING",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
    },
    {
      id: "ord_c8b9d0e2",
      user: { name: "Zainab Bano", email: "zainab@lux.com", phone: "+923219876543" },
      items: [ { product: { name: "Silver Lotus Pattern Protocol" } } ],
      totalAmount: 85.50,
      status: "COMPLETED",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
    },
    {
      id: "ord_a5f2e8c1",
      user: { name: "John Doe", email: "john@cyber.com", phone: "+14155552671" },
      items: [ { product: { name: "Neon Skull Cyber DST" } } ],
      totalAmount: 150.00,
      status: "PENDING",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString() // 2 days ago
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/seller/orders");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch("/api/seller/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      if (response.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.user?.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
            ORDER <span className="text-gradient">MANIFEST.</span>
          </h1>
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">Tracking global asset deployment cycles</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="h-16 px-8 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
            <Download size={18} className="mr-3" />
            EXTRACT LOGS
          </Button>
        </div>
      </div>

      <div className="glass rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row gap-6 items-center justify-between bg-white/[0.02]">
           <div className="relative w-full sm:w-[400px] group">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH MANIFEST..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-[11px] font-black tracking-[0.2em] uppercase focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
              />
           </div>
           <div className="flex space-x-3 w-full sm:w-auto">
             <Button variant="outline" className="h-14 px-6 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
               <Filter size={16} className="mr-3 text-primary" />
               STATUS FILTER
             </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] border-b border-white/5">
              <tr>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">IDENTIFIER</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">RECIPIENT</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">DEPLOY DATE</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">QUANTITY</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">VALUATION</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">STATUS</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Synchronizing Ledger...</p>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 italic">No deployments found in manifest.</p>
                  </td>
                </tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 px-8 font-black text-sm tracking-tighter italic text-primary">#{order.id.slice(-8).toUpperCase()}</td>
                  <td className="py-6 px-8 text-[11px] font-black uppercase tracking-tight">{order.user?.name || order.user?.email || "Unknown"}</td>
                  <td className="py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-6 px-8 text-[11px] font-black tracking-widest">{order.items.length} UNITS</td>
                  <td className="py-6 px-8 text-sm font-black italic">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-6 px-8">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] italic border bg-transparent outline-none cursor-pointer ${
                        order.status === 'COMPLETED' ? 'text-chart-2 border-chart-2/20' : 
                        order.status === 'PROCESSING' ? 'text-primary border-primary/20' :
                        order.status === 'PENDING' ? 'text-yellow-500 border-yellow-500/20' :
                        'text-destructive border-destructive/20'
                      }`}
                    >
                      <option value="PENDING" className="bg-[#0F172A]">PENDING</option>
                      <option value="PROCESSING" className="bg-[#0F172A]">PROCESSING</option>
                      <option value="COMPLETED" className="bg-[#0F172A]">COMPLETED</option>
                      <option value="CANCELLED" className="bg-[#0F172A]">CANCELLED</option>
                    </select>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <a 
                        href={`https://wa.me/${order.user?.phone?.replace(/[^0-9]/g, '') || '923451234567'}?text=Order%20Update%20for%20Invoice%20%23${order.id.slice(-8).toUpperCase()}%3A%20Your%20custom%20stitching%20asset%20is%20now%20in%20status%20${order.status}!%20Thank%20you%20for%20choosing%20Ultimate%20Digitizing.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-xl"
                        title="Text updates via WhatsApp"
                      >
                        <MessageSquare size={16} />
                      </a>
                      <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl glass border border-white/10 text-muted-foreground hover:text-primary transition-all group-hover:scale-110 shadow-xl">
                        <Eye size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
           <p className="text-[10px] font-black text-muted-foreground/20 uppercase tracking-[0.4em] italic">Displaying latest sync from network</p>
           <div className="flex space-x-2">
              <Button variant="ghost" className="h-10 px-4 rounded-xl font-black text-[9px] uppercase tracking-widest text-muted-foreground/40">PREV</Button>
              <Button variant="ghost" className="h-10 px-4 rounded-xl font-black text-[9px] uppercase tracking-widest text-primary">NEXT</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
