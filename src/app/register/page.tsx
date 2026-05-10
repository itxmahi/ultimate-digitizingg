"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Mail, Lock, User, Store, Loader2, Sparkles, 
  CheckCircle2, Zap, ShieldCheck, Globe, Trophy, Star 
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"BUYER" | "SELLER">("BUYER");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-foreground selection:bg-primary/30 relative overflow-hidden flex items-center justify-center py-20 px-6">
      {/* Dynamic Cinematic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[900px] h-[900px] bg-chart-4/5 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Value Propositions (SaaS Vibe) */}
        <div className="lg:col-span-6 space-y-12 hidden lg:block">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-6"
           >
              <Link href="/" className="inline-flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-all duration-500">
                   <span className="text-primary font-black text-2xl italic">U</span>
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase italic text-white group-hover:text-primary transition-colors">Ultimate Digitizing</span>
              </Link>
              <h1 className="text-7xl font-black text-white leading-[0.85] uppercase italic tracking-tighter">
                INITIALIZE YOUR <br />
                <span className="text-gradient NOT-italic">LEGACY.</span>
              </h1>
              <p className="text-xl text-muted-foreground/40 font-black uppercase tracking-tight italic max-w-lg">
                Join the global elite in digital embroidery architecture. High-performance tools for high-performance creators.
              </p>
           </motion.div>

           <div className="grid grid-cols-2 gap-8">
              {[
                { icon: <Globe size={20} />, title: "Global Reach", desc: "Connect with the world's top 1% of digitizers." },
                { icon: <ShieldCheck size={20} />, title: "Secure Protocol", desc: "Enterprise-grade security for your digital assets." },
                { icon: <Trophy size={20} />, title: "Elite Quality", desc: "Verified designs with 99.9% success ratio." },
                { icon: <Zap size={20} />, title: "Fast Liquidity", desc: "Instant payouts and real-time transaction tracking." },
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-8 glass rounded-[2.5rem] border-white/5 space-y-4 hover:border-primary/20 transition-all group"
                >
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {benefit.icon}
                   </div>
                   <h3 className="font-black text-sm uppercase tracking-widest text-white italic">{benefit.title}</h3>
                   <p className="text-[10px] text-muted-foreground/40 uppercase font-black tracking-tighter italic">{benefit.desc}</p>
                </motion.div>
              ))}
           </div>

           <div className="pt-10 flex items-center space-x-6 border-t border-white/5">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <img key={i} src={`https://i.pravatar.cc/100?u=register${i}`} className="w-10 h-10 rounded-full border-2 border-[#020617]" alt="User" />
                 ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 italic">
                Authorized by <span className="text-primary">12,000+</span> Elite Professionals
              </p>
           </div>
        </div>

        {/* Right Side: Immersive Registration Form */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl glass p-10 md:p-16 rounded-[4rem] border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            
            <div className="flex justify-between items-center mb-16 relative z-10">
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Create Account</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 italic">Protocol Initialization V1.0</p>
              </div>
              <Link href="/login" className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic hover:underline decoration-2 underline-offset-8">
                Member Login
              </Link>
            </div>

            <div className="space-y-10 relative z-10">
              {/* Role Selection (Fiverr/SaaS Style) */}
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 ml-4">I want to join as a:</label>
                <div className="grid grid-cols-2 gap-6">
                   <button 
                     type="button" 
                     onClick={() => setUserType("BUYER")}
                     className={`relative p-8 rounded-[2rem] border transition-all duration-700 text-left overflow-hidden group ${
                       userType === "BUYER" 
                         ? "bg-primary/10 border-primary shadow-[0_20px_50px_rgba(37,99,235,0.2)]" 
                         : "bg-white/[0.02] border-white/5 hover:border-white/10"
                     }`}
                   >
                      <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 ${userType === "BUYER" ? "bg-primary text-white" : "bg-white/5 text-muted-foreground/40"}`}>
                        <User size={24} />
                      </div>
                      <span className={`block font-black text-lg uppercase italic tracking-tighter ${userType === "BUYER" ? "text-white" : "text-muted-foreground/40"}`}>Buyer</span>
                      <p className={`text-[9px] font-black uppercase mt-2 leading-relaxed tracking-tight ${userType === "BUYER" ? "text-primary/60" : "text-muted-foreground/20"}`}>Acquire elite embroidery assets.</p>
                      {userType === "BUYER" && <motion.div layoutId="role-active" className="absolute top-4 right-4 text-primary"><CheckCircle2 size={20} /></motion.div>}
                   </button>
                   <button 
                     type="button" 
                     onClick={() => setUserType("SELLER")}
                     className={`relative p-8 rounded-[2rem] border transition-all duration-700 text-left overflow-hidden group ${
                       userType === "SELLER" 
                         ? "bg-primary/10 border-primary shadow-[0_20px_50px_rgba(37,99,235,0.2)]" 
                         : "bg-white/[0.02] border-white/5 hover:border-white/10"
                     }`}
                   >
                      <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 ${userType === "SELLER" ? "bg-primary text-white" : "bg-white/5 text-muted-foreground/40"}`}>
                        <Store size={24} />
                      </div>
                      <span className={`block font-black text-lg uppercase italic tracking-tighter ${userType === "SELLER" ? "text-white" : "text-muted-foreground/40"}`}>Seller</span>
                      <p className={`text-[9px] font-black uppercase mt-2 leading-relaxed tracking-tight ${userType === "SELLER" ? "text-primary/60" : "text-muted-foreground/20"}`}>Scale your digitizing empire.</p>
                      {userType === "SELLER" && <motion.div layoutId="role-active" className="absolute top-4 right-4 text-primary"><CheckCircle2 size={20} /></motion.div>}
                   </button>
                </div>
              </div>

              {/* Social Login */}
              <Button 
                disabled={isLoading}
                onClick={handleGoogleSignIn}
                className="w-full h-20 rounded-[2rem] bg-white text-black hover:bg-white/90 border-none flex items-center justify-center font-black text-[12px] tracking-[0.4em] uppercase transition-all duration-500 shadow-2xl active:scale-[0.98] italic"
              >
                {isLoading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <>
                    <FaGoogle size={20} className="mr-6" />
                    Initialize with Google
                  </>
                )}
              </Button>

              <div className="relative">
                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                 <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-[#020617] px-8 text-muted-foreground/40 font-black tracking-[0.5em] italic">Or Manual Protocol</span></div>
              </div>

              {/* Manual Form */}
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Full Name</label>
                          <div className="relative group">
                             <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                             <input type="text" placeholder="IDENTITY" className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Email</label>
                          <div className="relative group">
                             <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                             <input type="email" placeholder="COMM LINK" className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Access Password</label>
                       <div className="relative group">
                          <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                          <input type="password" placeholder="••••••••" className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" />
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center space-x-4 px-4 group cursor-pointer">
                    <div className="relative w-6 h-6">
                       <input type="checkbox" className="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
                       <div className="w-6 h-6 rounded-lg border-2 border-white/5 bg-white/[0.02] peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                          <motion.div initial={false} animate={{ scale: 1 }} className="text-white"><CheckCircle2 size={12} /></motion.div>
                       </div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors italic">
                       I agree to the <span className="text-primary hover:underline">Terms of Service</span>
                    </p>
                 </div>

                 <Button className="w-full h-24 rounded-[2.5rem] luxury-gradient border-none text-white font-black text-[12px] tracking-[0.6em] uppercase italic shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500">
                    AUTHORIZE ACCOUNT
                    <Sparkles size={20} className="ml-6" />
                 </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
