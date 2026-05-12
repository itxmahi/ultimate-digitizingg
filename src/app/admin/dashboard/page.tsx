"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ShieldCheck,
  Store,
  Mail,
  MapPin,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [pendingSellers, setPendingSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPendingSellers = async () => {
    try {
      const response = await fetch("/api/admin/sellers?status=PENDING");
      const data = await response.json();
      setPendingSellers(data);
    } catch (error) {
      console.error("Failed to fetch pending sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingSellers();
  }, []);

  const handleApprove = async (userId: string) => {
    setProcessingId(userId);
    try {
      const response = await fetch("/api/admin/approve-seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "APPROVE" }),
      });
      if (response.ok) {
        setPendingSellers(prev => prev.filter(s => s.userId !== userId));
      }
    } catch (error) {
      console.error("Failed to approve seller:", error);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 space-y-4">
      <Loader2 className="animate-spin text-primary" size={48} />
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Scanning Elite Applications...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-primary">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">GOVERNANCE MODULE</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">PENDING <span className="text-gradient">MERCHANTS.</span></h1>
        </div>
        <div className="glass p-6 rounded-2xl border-white/5 flex items-center space-x-6">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-muted-foreground/40 uppercase">Awaiting Review</span>
              <span className="text-3xl font-black italic">{pendingSellers.length}</span>
           </div>
           <Users size={32} className="text-primary/20" />
        </div>
      </div>

      {pendingSellers.length === 0 ? (
        <div className="py-40 text-center glass rounded-[4rem] border-dashed border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">No pending applications detected in the stream.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pendingSellers.map((seller, i) => (
            <motion.div 
              key={seller.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[3.5rem] border border-white/5 hover:border-primary/20 transition-all duration-700 space-y-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/40 transition-all">
                    <img src={seller.user.image || "https://i.pravatar.cc/100"} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black tracking-tight italic uppercase">{seller.storeName}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{seller.businessCategory}</p>
                  </div>
                </div>
                <div className="text-[10px] font-black text-muted-foreground/20 italic">ID: {seller.cnic}</div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center space-x-4 text-muted-foreground/60">
                   <Mail size={14} className="text-primary" />
                   <span className="text-[11px] font-bold italic">{seller.user.email}</span>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground/60">
                   <MapPin size={14} className="text-primary" />
                   <span className="text-[11px] font-bold italic truncate">{seller.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  onClick={() => handleApprove(seller.userId)}
                  disabled={processingId === seller.userId}
                  className="flex-1 h-14 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all italic shadow-2xl shadow-primary/20"
                >
                  {processingId === seller.userId ? <Loader2 className="animate-spin" /> : <>APPROVE MERCHANT <CheckCircle2 size={16} className="ml-3" /></>}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-14 h-14 rounded-2xl glass border-white/10 text-destructive hover:bg-destructive hover:text-white transition-all shadow-xl"
                >
                  <XCircle size={20} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
