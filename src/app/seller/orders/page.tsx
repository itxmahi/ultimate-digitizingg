"use client";

import React from "react";
import { Search, Filter, ShoppingBag, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrdersPage = () => {
  const orders = [
    { id: "#ORD-9281", customer: "Sarah Jenkins", date: "Oct 24, 2023", items: 2, total: "$45.00", status: "Completed" },
    { id: "#ORD-9280", customer: "Michael Chen", date: "Oct 24, 2023", items: 1, total: "$15.00", status: "Processing" },
    { id: "#ORD-9279", customer: "Emma Wilson", date: "Oct 23, 2023", items: 4, total: "$120.00", status: "Pending" },
    { id: "#ORD-9278", customer: "James Rodriguez", date: "Oct 22, 2023", items: 1, total: "$25.00", status: "Completed" },
    { id: "#ORD-9277", customer: "Lisa Taylor", date: "Oct 21, 2023", items: 3, total: "$85.00", status: "Cancelled" },
  ];

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
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-[11px] font-black tracking-[0.2em] uppercase focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
              />
           </div>
           <div className="flex space-x-3 w-full sm:w-auto">
             <Button variant="outline" className="h-14 px-6 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
               <Filter size={16} className="mr-3 text-primary" />
               STATUS FILTER
             </Button>
             <Button variant="outline" className="h-14 px-6 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
               CHRONOLOGY
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 px-8 font-black text-sm tracking-tighter italic text-primary">{order.id}</td>
                  <td className="py-6 px-8 text-[11px] font-black uppercase tracking-tight">{order.customer}</td>
                  <td className="py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{order.date}</td>
                  <td className="py-6 px-8 text-[11px] font-black tracking-widest">{order.items} UNITS</td>
                  <td className="py-6 px-8 text-sm font-black italic">{order.total}</td>
                  <td className="py-6 px-8">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] italic border ${
                      order.status === 'Completed' ? 'bg-chart-2/10 text-chart-2 border-chart-2/20' : 
                      order.status === 'Processing' ? 'bg-primary/10 text-primary border-primary/20' :
                      order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-destructive/10 text-destructive border-destructive/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl glass border-white/10 text-muted-foreground hover:text-primary transition-all group-hover:scale-110 shadow-xl">
                      <Eye size={18} />
                    </Button>
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
