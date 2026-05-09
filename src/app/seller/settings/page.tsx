"use client";

import React, { useState } from "react";
import { 
  Save, 
  Camera, 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Smartphone, 
  Globe, 
  Mail,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const tabs = [
    { id: "profile", name: "Profile", icon: <User size={18} />, desc: "Public identity & studio specs" },
    { id: "security", name: "Security", icon: <Lock size={18} />, desc: "Access protocols & encryption" },
    { id: "notifications", name: "Notifications", icon: <Bell size={18} />, desc: "Neural link & alert config" },
    { id: "billing", name: "Billing & Payouts", icon: <CreditCard size={18} />, desc: "Financial stream management" },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
            STUDIO <span className="text-gradient">CONFIG.</span>
          </h1>
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">Calibrating your global seller footprint</p>
        </div>
        <div className="flex items-center space-x-4">
           {success && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }}
               className="flex items-center text-chart-2 font-black text-[10px] uppercase tracking-widest bg-chart-2/10 px-6 py-3 rounded-xl border border-chart-2/20"
             >
               <CheckCircle2 size={16} className="mr-3" />
               PROTOCOLS UPDATED
             </motion.div>
           )}
           <Button 
            disabled={isSaving}
            onClick={handleSave}
            className="h-16 px-10 rounded-2xl luxury-gradient border-none text-white shadow-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all italic"
           >
             {isSaving ? "SYNCING..." : (
               <>
                 <Save size={18} className="mr-3" />
                 DEPLOY CHANGES
               </>
             )}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass border border-white/5 rounded-[2.5rem] p-4 p-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
            
            <div className="flex flex-col space-y-2 relative z-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full group text-left px-6 py-5 rounded-2xl transition-all duration-500 flex items-start space-x-4 ${
                    activeTab === tab.id 
                      ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                      : "text-muted-foreground/60 hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <div className={`mt-0.5 transition-transform duration-500 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-110"}`}>
                    {tab.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{tab.name}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest opacity-40 leading-none ${activeTab === tab.id ? "text-white" : ""}`}>{tab.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass border border-primary/20 rounded-3xl p-8 bg-primary/5 text-center relative group overflow-hidden">
             <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             <Zap size={24} className="mx-auto mb-4 text-primary animate-pulse" />
             <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 italic">Security Level</p>
             <p className="text-xl font-black italic tracking-tighter text-gradient">MAXIMUM PROTECTION</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="glass border border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

              {activeTab === "profile" && (
                <div className="space-y-12">
                   <div className="flex items-center space-x-8">
                     <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-upload')?.click()}>
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img 
                          src={session?.user?.image || "https://i.pravatar.cc/200"} 
                          alt="Profile" 
                          className="relative z-10 w-32 h-32 rounded-[2.5rem] object-cover border-4 border-white/10 shadow-2xl transition-transform group-hover:scale-105 duration-500" 
                        />
                        <div className="absolute bottom-[-10px] right-[-10px] z-20 bg-primary text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-90 transition-all">
                          <Camera size={20} />
                        </div>
                        <input type="file" id="profile-upload" className="hidden" accept="image/*" />
                     </div>
                     <div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-1">{session?.user?.name || "STUDIO USER"}</h2>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-chart-2 rounded-full mr-3" />
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 italic">Elite Partner Tier • 1.2k Deployments</p>
                        </div>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-4 italic">Public Display Identity</label>
                        <input 
                          type="text" 
                          defaultValue={session?.user?.name || "Studio Alpha"}
                          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-4 italic">Neural Communication Email</label>
                        <input 
                          type="email" 
                          defaultValue={session?.user?.email || "alpha@network.com"}
                          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
                        />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-4 italic">Studio Transmission (Bio)</label>
                      <textarea 
                        rows={5}
                        defaultValue="High-velocity industrial digitizing protocols. Specialized in heavy-duty asset deployment and precision-engineered embroidery workflows."
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-6 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10 resize-none leading-relaxed"
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { label: "WhatsApp Link", val: "+1 (555) 234-987", icon: <Globe size={16} /> },
                        { label: "Location Sector", val: "Global Network", icon: <Globe size={16} /> },
                        { label: "Studio Tier", val: "Industrial Elite", icon: <Zap size={16} /> },
                      ].map((field, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-white/5 relative group cursor-pointer hover:border-primary/20 transition-all">
                           <div className="flex items-center space-x-3 mb-3 text-muted-foreground/40 group-hover:text-primary transition-colors">
                              {field.icon}
                              <span className="text-[9px] font-black uppercase tracking-widest">{field.label}</span>
                           </div>
                           <p className="text-[11px] font-black uppercase italic tracking-tighter">{field.val}</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-12">
                   <div className="space-y-6">
                      <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center">
                         <Shield className="mr-4 text-primary" size={24} />
                         Access Credentials
                      </h3>
                      <div className="grid grid-cols-1 gap-8">
                         {[
                           { label: "Current Access Key", placeholder: "********" },
                           { label: "New Access Key", placeholder: "Enter high-entropy key" },
                           { label: "Confirm Protocol", placeholder: "Repeat key" },
                         ].map((pw, i) => (
                           <div key={i} className="space-y-3">
                              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-4 italic">{pw.label}</label>
                              <input 
                                type="password" 
                                placeholder={pw.placeholder}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
                              />
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-8 p-10 glass border border-white/5 rounded-[2.5rem]">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 glass border border-white/10 rounded-2xl flex items-center justify-center text-primary">
                               <Smartphone size={32} />
                            </div>
                            <div>
                               <h4 className="font-black text-sm uppercase italic tracking-widest">Two-Factor Encryption</h4>
                               <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest mt-1">Multi-layered account protection protocols</p>
                            </div>
                         </div>
                         <div className="w-16 h-8 bg-chart-2/20 rounded-full border border-chart-2/40 flex items-center px-1 cursor-pointer">
                            <div className="w-6 h-6 bg-chart-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-10">
                   <div className="flex flex-col space-y-6">
                      {[
                        { title: "Order Ingestion Alerts", desc: "Receive immediate signals when new assets are deployed by clients.", active: true },
                        { title: "Communication Link Alerts", desc: "Get notified when new encrypted transmissions arrive in your comms hub.", active: true },
                        { title: "Financial Stream Signals", desc: "Real-time alerts for payout initiations and ledger reconciliations.", active: false },
                        { title: "Market Volatility Reports", desc: "Weekly intelligence summaries on global embroidery demand spikes.", active: true },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-8 glass border border-white/5 hover:border-white/10 rounded-[2.5rem] transition-all group">
                           <div className="flex-1 space-y-2">
                              <h4 className="font-black text-sm uppercase italic tracking-widest group-hover:text-primary transition-colors">{item.title}</h4>
                              <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest max-w-md">{item.desc}</p>
                           </div>
                           <div className={`w-16 h-8 ${item.active ? 'bg-primary/20 border-primary/40' : 'bg-white/5 border-white/10'} rounded-full border flex items-center px-1 cursor-pointer transition-all`}>
                              <div className={`w-6 h-6 ${item.active ? 'bg-primary shadow-[0_0_15px_rgba(37,99,235,0.6)] translate-x-8' : 'bg-white/20 translate-x-0'} rounded-full transition-all duration-500`} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="p-10 luxury-gradient rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                         <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                         <div className="relative z-10 space-y-12">
                            <div className="flex justify-between items-start">
                               <div className="flex space-x-2">
                                  <div className="w-12 h-8 bg-white/20 backdrop-blur-xl rounded border border-white/20 flex items-center justify-center font-black text-[8px]">VISA</div>
                                  <div className="w-12 h-8 bg-white/20 backdrop-blur-xl rounded border border-white/20 flex items-center justify-center font-black text-[8px]">JAZZ</div>
                               </div>
                               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">Financial Hub</span>
                            </div>
                            <p className="text-2xl font-black tracking-[0.3em] italic">0345 - ****882</p>
                            <div className="flex justify-between items-end">
                               <div>
                                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-1">ACCOUNT TYPE</span>
                                  <span className="text-[11px] font-black uppercase italic tracking-widest">JAZZCASH / EASYPAISA</span>
                               </div>
                               <div>
                                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-1">IDENTIFIER</span>
                                  <span className="text-[11px] font-black uppercase italic tracking-widest">{session?.user?.name || "STUDIO USER"}</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="glass border border-white/5 rounded-[3rem] p-10 flex flex-col space-y-8">
                         <h4 className="font-black text-sm uppercase italic tracking-widest px-2">Update Payout Link</h4>
                         
                         <div className="space-y-6">
                            <div className="space-y-3">
                               <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-4 italic">Wallet Provider</label>
                               <select className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none italic cursor-pointer">
                                  <option className="bg-[#0F172A]">JAZZCASH</option>
                                  <option className="bg-[#0F172A]">EASYPAISA</option>
                                  <option className="bg-[#0F172A]">BANK ACCOUNT (IBAN)</option>
                               </select>
                            </div>
                            
                            <div className="space-y-3">
                               <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-4 italic">Account Number / IBAN</label>
                               <input 
                                 type="text" 
                                 placeholder="e.g. 03450000000"
                                 className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-sm font-black uppercase tracking-widest focus:ring-4 ring-primary/10 transition-all outline-none italic placeholder:text-muted-foreground/10"
                               />
                            </div>

                            <p className="text-[9px] text-muted-foreground/30 px-4 leading-relaxed uppercase tracking-widest">
                               * Verify your account identifier carefully. Incorrect protocols may result in permanent asset loss during financial deployment.
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center px-4">
                         <ChevronRight className="mr-2 text-primary" size={24} />
                         Available Gateways
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {[
                           { name: "JazzCash Protocol", desc: "Direct wallet ingestion", icon: "J" },
                           { name: "EasyPaisa Gateway", desc: "Instant mobile credit", icon: "E" },
                           { name: "Bank Wire (IBAN)", desc: "Standard SWIFT transfer", icon: "B" },
                         ].map((method, i) => (
                           <div key={i} className="flex items-center justify-between p-6 glass border border-white/5 rounded-2xl hover:border-primary/20 transition-all cursor-pointer group">
                              <div className="flex items-center space-x-4">
                                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-primary border border-white/10 group-hover:scale-110 transition-transform">{method.icon}</div>
                                 <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">{method.name}</p>
                                    <p className="text-[8px] text-muted-foreground/40 uppercase tracking-widest">{method.desc}</p>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-8">
                      <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center px-4">
                         <ChevronRight className="mr-2 text-primary" size={24} />
                         Revenue Streams
                      </h3>
                      <div className="space-y-4">
                         {[
                           { date: "May 08, 2026", amount: "+ $1,240.50", desc: "Batch Payout #88241", status: "COMPLETED" },
                           { date: "May 01, 2026", amount: "+ $840.00", desc: "Batch Payout #88239", status: "COMPLETED" },
                           { date: "Apr 24, 2026", amount: "+ $2,100.20", desc: "Batch Payout #88235", status: "PROCESSING" },
                         ].map((trx, i) => (
                           <div key={i} className="flex items-center justify-between p-8 glass border border-white/5 rounded-[2.5rem] group hover:border-white/10 transition-all">
                              <div className="flex items-center space-x-6">
                                 <div className="w-14 h-14 glass border border-white/10 rounded-2xl flex items-center justify-center text-chart-2">
                                    <Zap size={24} />
                                 </div>
                                 <div>
                                    <h4 className="font-black text-[11px] uppercase tracking-widest italic">{trx.desc}</h4>
                                    <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest mt-1">{trx.date}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-black text-lg tracking-tighter italic text-chart-2 mb-1">{trx.amount}</p>
                                 <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${trx.status === 'COMPLETED' ? 'text-chart-2 border-chart-2/20 bg-chart-2/5' : 'text-primary border-primary/20 bg-primary/5'} tracking-widest`}>{trx.status}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Simple Icon component for the "Add" button
const PlusCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);

export default SettingsPage;
