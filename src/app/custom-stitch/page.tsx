"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Palette, 
  Maximize, 
  CheckCircle2, 
  Send,
  Zap,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomStitch = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-white">
      {/* Background Cinematic Effects - "HEAVY" VIBE */}
      <div className="fixed inset-0 -z-10 bg-[#020617]">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] bg-chart-4/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] bg-chart-2/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-40 pb-32">
        {/* Header Section - "ULTRA" TYPOGRAPHY */}
        <div className="text-center mb-32 space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 px-8 py-3 rounded-full glass border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <Sparkles size={18} className="text-primary animate-spin-slow" />
            <span className="text-[11px] font-black tracking-[0.4em] uppercase text-primary italic">
              Elite Digitizing Protocol
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.75] uppercase italic"
          >
            CUSTOM <br />
            <span className="text-gradient NOT-italic">STITCHING.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-muted-foreground/60 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            Transforming your most complex visions into flawless machine-ready protocols. Engineered for precision, delivered with speed.
          </motion.p>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-[20%] right-0 -z-10 opacity-20 hidden xl:block">
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Zap size={200} className="text-primary/20" />
           </motion.div>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Progress Tracker Sidebar (Left) */}
          <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
            <div className="glass border border-white/10 rounded-[3.5rem] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="space-y-12 relative z-10">
                {[
                  { s: 1, label: "ASSET INGESTION", desc: "Upload your master artwork" },
                  { s: 2, label: "SPECIFICATIONS", desc: "Define technical parameters" },
                  { s: 3, label: "FINAL PROTOCOL", desc: "Deploy stitching request" }
                ].map((item) => {
                  const isActive = step === item.s;
                  const isDone = step > item.s;
                  return (
                    <div key={item.s} className="flex items-center space-x-6 group">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-700 shadow-2xl relative ${
                        isActive ? 'bg-primary text-white scale-110 rotate-6 ring-4 ring-primary/20' : 
                        isDone ? 'bg-chart-2 text-white' : 'bg-white/5 text-muted-foreground/40 border border-white/5'
                      }`}>
                        {isDone ? <CheckCircle2 size={24} /> : item.s}
                        {isActive && <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full -z-10" />}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${isActive ? 'text-primary' : 'text-muted-foreground/40'}`}>
                          {item.label}
                        </span>
                        <span className="text-[10px] font-black text-muted-foreground/20 uppercase tracking-widest mt-1.5">{item.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="pt-12 mt-12 border-t border-white/5 space-y-8 relative z-10">
                 <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-white/5">
                       <Clock size={20} />
                    </div>
                    <div>
                       <h4 className="text-xs font-black uppercase tracking-widest mb-1">VELOCITY DELIVERY</h4>
                       <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest leading-relaxed">Completed within 12-24 Hours.</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-chart-4 group-hover:bg-chart-4 group-hover:text-white transition-all duration-500 border border-white/5">
                       <ShieldCheck size={20} />
                    </div>
                    <div>
                       <h4 className="text-xs font-black uppercase tracking-widest mb-1">QUALITY OVERRIDE</h4>
                       <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest leading-relaxed">100% Precision Guarantee.</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="glass border border-primary/20 rounded-[3rem] p-10 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <h4 className="font-black text-primary text-xl uppercase tracking-tighter italic mb-3">Live Intelligence</h4>
               <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] mb-8">Our expert digitizers are online now.</p>
               <Button className="w-full h-16 rounded-[1.5rem] bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all">
                  INITIALIZE LIVE CHAT
               </Button>
            </div>
          </div>

          {/* Main Form Content (Right) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="glass border border-white/10 rounded-[4rem] p-10 lg:p-20 shadow-[0_80px_160px_rgba(0,0,0,0.6)] relative overflow-hidden min-h-[750px] flex flex-col">
               {/* Internal Background Glow */}
               <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
               
               <form className="flex-1 flex flex-col space-y-16 relative z-10">
                  {step === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="space-y-12 flex-1"
                    >
                       <div className="space-y-6">
                          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                            1. ASSET <span className="text-gradient NOT-italic">INGESTION.</span>
                          </h2>
                          <p className="text-muted-foreground font-medium text-xl leading-relaxed italic max-w-2xl">
                            Deploy your master artwork. We accept high-resolution RAW, PDF, PNG, and Vector formats for elite analysis.
                          </p>
                       </div>
                       
                       <div className="relative group">
                          <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-chart-4/30 rounded-[4rem] blur-[30px] opacity-0 group-hover:opacity-50 transition duration-1000" />
                          <div className="relative border-[3px] border-dashed border-white/5 bg-white/[0.02] rounded-[4rem] p-24 text-center hover:border-primary/40 transition-all duration-700 cursor-pointer group flex flex-col items-center justify-center">
                             <div className="w-28 h-28 glass border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                                <Upload size={48} className="text-primary" />
                             </div>
                             <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase italic">Deploy Files Here</h3>
                             <p className="text-muted-foreground/40 font-black uppercase tracking-[0.3em] text-[10px]">Cloud Transfer or Local Protocol</p>
                             <div className="mt-12 flex items-center space-x-4 px-6 py-3 glass border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 shadow-2xl">
                                <Zap size={14} className="text-primary animate-pulse" /> MAX PAYLOAD: 128MB
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="space-y-12 flex-1"
                    >
                       <div className="space-y-6">
                          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                            2. SELECT <span className="text-gradient NOT-italic">PROTOCOL.</span>
                          </h2>
                          <p className="text-muted-foreground font-medium text-xl leading-relaxed italic max-w-2xl">
                            Configure the mechanical parameters of your stitch. Every detail matters for industrial perfection.
                          </p>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 ml-2 flex items-center">
                               <Palette size={12} className="mr-3 text-primary" /> Technology Model
                             </label>
                             <select className="w-full h-20 bg-white/5 border border-white/5 rounded-[1.5rem] px-8 font-black uppercase tracking-widest text-[11px] text-foreground focus:ring-4 ring-primary/10 transition-all outline-none appearance-none cursor-pointer hover:bg-white/10 shadow-inner">
                                <option>Flat Industrial Standard</option>
                                <option>3D Puff / High Profile</option>
                                <option>Laser Cut Applique</option>
                                <option>Elite Chain Protocol</option>
                             </select>
                          </div>
                          <div className="space-y-4">
                             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 ml-2 flex items-center">
                               <FileText size={12} className="mr-3 text-chart-4" /> Base Material
                             </label>
                             <select className="w-full h-20 bg-white/5 border border-white/5 rounded-[1.5rem] px-8 font-black uppercase tracking-widest text-[11px] text-foreground focus:ring-4 ring-primary/10 transition-all outline-none appearance-none cursor-pointer hover:bg-white/10 shadow-inner">
                                <option>Elite Cotton / Jersey</option>
                                <option>Performance Pique</option>
                                <option>Industrial Denim</option>
                                <option>Ballistic Nylon / Mesh</option>
                             </select>
                          </div>
                          <div className="space-y-4">
                             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 ml-2 flex items-center">
                               <Maximize size={12} className="mr-3 text-chart-2" /> Master Dimension
                             </label>
                             <input type="text" placeholder="E.G. 150MM WIDTH" className="w-full h-20 bg-white/5 border border-white/5 rounded-[1.5rem] px-8 font-black uppercase tracking-widest text-[11px] focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner placeholder:text-muted-foreground/10" />
                          </div>
                          <div className="space-y-4">
                             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 ml-2 flex items-center">
                               <Maximize size={12} className="mr-3 text-primary" /> Surface Placement
                             </label>
                             <input type="text" placeholder="E.G. HAT FRONT CENTER" className="w-full h-20 bg-white/5 border border-white/5 rounded-[1.5rem] px-8 font-black uppercase tracking-widest text-[11px] focus:ring-4 ring-primary/10 transition-all outline-none shadow-inner placeholder:text-muted-foreground/10" />
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 ml-2 flex items-center">
                            Mechanical Instructions & Color Protocols
                          </label>
                          <textarea placeholder="DEFINE GRADIENTS, THREAD CODES, OR SPECIAL DENSITY PARAMETERS..." className="w-full h-48 bg-white/5 border border-white/5 rounded-[2rem] px-10 py-8 font-black uppercase tracking-widest text-[11px] focus:ring-4 ring-primary/10 transition-all outline-none resize-none placeholder:text-muted-foreground/10 hover:bg-white/10 shadow-inner"></textarea>
                       </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="space-y-16 flex-1 text-center py-10"
                    >
                       <div className="relative w-40 h-40 mx-auto">
                          <div className="absolute inset-0 bg-primary/30 blur-[50px] animate-pulse rounded-full" />
                          <div className="relative w-full h-full glass border border-white/10 rounded-[3.5rem] flex items-center justify-center text-primary shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                             <CheckCircle2 size={80} className="animate-bounce" />
                          </div>
                       </div>
                       <div className="space-y-6">
                          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">READY FOR <span className="text-gradient">DEPLOYMENT.</span></h2>
                          <p className="text-muted-foreground font-medium text-2xl max-w-2xl mx-auto italic leading-relaxed">
                            Your protocol is verified. Our master digitizers will now transform this into a masterpiece.
                          </p>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 text-left">
                          {[
                            { label: "PROTOCOL LEVEL", value: "ELITE CUSTOM", icon: <Sparkles size={16} /> },
                            { label: "DEPLOYMENT TIME", value: "UNDER 24 HOURS", icon: <Clock size={16} /> },
                            { label: "STARTING COST", value: "$15.00 USD", icon: <Zap size={16} /> },
                            { label: "VERIFICATION", value: "100% OPTIMIZED", icon: <ShieldCheck size={16} /> },
                          ].map((stat, i) => (
                            <div key={i} className="glass border border-white/5 p-8 rounded-[2.5rem] flex flex-col space-y-4 hover:border-primary/20 transition-all duration-500 shadow-2xl">
                               <div className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
                                  {stat.icon} <span className="ml-3">{stat.label}</span>
                                </div>
                               <span className="font-black text-2xl tracking-tighter uppercase italic">{stat.value}</span>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between pt-16 border-t border-white/5 relative z-10">
                     {step > 1 ? (
                       <Button 
                        type="button" 
                        onClick={prevStep} 
                        variant="outline" 
                        className="rounded-2xl h-20 px-12 glass border-white/5 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all shadow-xl"
                       >
                        PREVIOUS PHASE
                       </Button>
                     ) : <div />}
                     
                     {step < 3 ? (
                       <Button 
                        type="button" 
                        onClick={nextStep} 
                        className="rounded-[2.5rem] h-24 px-16 luxury-gradient border-none text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all italic"
                       >
                        CONTINUE PROTOCOL <ArrowRight size={20} className="ml-4" />
                       </Button>
                     ) : (
                       <Button 
                        type="button" 
                        className="rounded-[2.5rem] h-24 px-20 luxury-gradient border-none text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all italic"
                       >
                        DEPLOY FINAL REQUEST <Send size={20} className="ml-4" />
                       </Button>
                     )}
                  </div>
               </form>
            </div>
          </div>
        </div>

        {/* Global Impact Grid - "HEAVY" FEATURE SECTION */}
        <div className="mt-60 grid grid-cols-1 md:grid-cols-3 gap-20 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
           {[
             { 
               icon: <Clock size={48} />, 
               title: "VELOCITY", 
               desc: "95% OF REQUESTS DEPLOYED IN UNDER 18 HOURS WITH ZERO QUALITY LOSS.",
               color: "text-primary"
             },
             { 
               icon: <ShieldCheck size={48} />, 
               title: "PRECISION", 
               desc: "UNLIMITED PROTOCOL REVISIONS. WE DO NOT STOP UNTIL YOUR MACHINE IS PERFECT.",
               color: "text-chart-2"
             },
             { 
               icon: <Zap size={48} />, 
               title: "ECOSYSTEM", 
               desc: "FULL COMPATIBILITY WITH ALL INDUSTRIAL EMBROIDERY MACHINES WORLDWIDE.",
               color: "text-chart-4"
             },
           ].map((item, i) => (
             <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative flex flex-col items-center text-center space-y-10"
             >
               <div className={`w-32 h-32 glass rounded-[3rem] border border-white/5 flex items-center justify-center ${item.color} shadow-[0_40px_80px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative overflow-hidden group-hover:border-primary/20`}>
                  <div className="absolute inset-0 bg-current opacity-5" />
                  {item.icon}
               </div>
               <div className="space-y-6">
                 <h4 className="text-4xl font-black tracking-tighter uppercase italic">{item.title}</h4>
                 <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-[0.4em] leading-relaxed max-w-[280px]">{item.desc}</p>
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CustomStitch;
