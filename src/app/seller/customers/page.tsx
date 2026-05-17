"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Mail, MoreHorizontal, Loader2, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<any[]>([
    {
      id: "cust_1",
      name: "Ahmad Raza",
      email: "ahmad@titan.com",
      phone: "+923451234567",
      totalOrders: 15,
      totalSpent: "$1,850.00",
      lastOrder: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: "cust_2",
      name: "Zainab Bano",
      email: "zainab@lux.com",
      phone: "+923219876543",
      totalOrders: 9,
      totalSpent: "$980.50",
      lastOrder: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: "cust_3",
      name: "John Doe",
      email: "john@cyber.com",
      phone: "+14155552671",
      totalOrders: 24,
      totalSpent: "$4,200.00",
      lastOrder: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/seller/customers");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setCustomers(data);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
            CLIENT <span className="text-gradient">NETWORK.</span>
          </h1>
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">Managing global consumer relationships</p>
        </div>
      </div>

      <div className="glass rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-chart-4/5 rounded-full blur-[100px] -z-10" />
        
        <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row gap-6 items-center justify-between bg-white/[0.02]">
           <div className="relative w-full sm:w-[400px] group">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH CLIENTS..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-[11px] font-black tracking-[0.2em] uppercase focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
              />
           </div>
           <Button variant="outline" className="h-14 px-6 rounded-2xl glass border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all italic">
             <Filter size={16} className="mr-3 text-primary" />
             SEGMENTATION
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] border-b border-white/5">
              <tr>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">CLIENT IDENTIFIER</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">DEPLOYMENTS</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">TOTAL VOLUME</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">LAST SYNC</th>
                <th className="py-6 px-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic text-right">PROTOCOL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Syncing Intelligence...</p>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 italic">No clients detected in sector.</p>
                  </td>
                </tr>
              ) : filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 px-8">
                    <div className="flex items-center space-x-5">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center text-primary font-black text-lg relative z-10">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <p className="font-black text-[11px] uppercase tracking-tight italic">{customer.name}</p>
                        <p className="text-[9px] text-muted-foreground/40 font-black uppercase tracking-widest">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-sm font-black italic">{customer.totalOrders} UNITS</td>
                  <td className="py-6 px-8 text-sm font-black italic text-primary">{customer.totalSpent}</td>
                  <td className="py-6 px-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
                    {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : "NEVER"}
                  </td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <a 
                        href={`https://wa.me/${customer.phone?.replace(/[^0-9]/g, '') || '923451234567'}?text=Hello%20${customer.name}%2C%20this%20is%20your%20design%20manager%20from%20Ultimate%20Digitizing.%20Just%20checking%20if%20you%20need%20any%20new%20embroidery%20digitizing%20or%20vector%20files%20today!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-xl"
                        title="Quick WhatsApp message"
                      >
                        <MessageSquare size={14} />
                      </a>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl glass border border-white/5 text-muted-foreground hover:text-primary transition-all shadow-xl"><Mail size={16} /></Button>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl glass border border-white/5 text-muted-foreground hover:text-primary transition-all shadow-xl"><MoreHorizontal size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
