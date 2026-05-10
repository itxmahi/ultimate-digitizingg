"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, EyeOff, Loader2, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen bg-[#020617] text-foreground flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Dynamic Cinematic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-10%] w-[900px] h-[900px] bg-chart-4/5 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Branding & Context (Hidden on mobile) */}
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
                AUTHORIZE <br />
                <span className="text-gradient NOT-italic">ACCESS.</span>
              </h1>
              <p className="text-xl text-muted-foreground/40 font-black uppercase tracking-tight italic max-w-lg">
                Enter the global command center. Re-initialize your session within the world's most advanced digitizing hub.
              </p>
           </motion.div>

           <div className="flex items-center space-x-8 pt-10 border-t border-white/5">
              <div className="flex items-center space-x-3 text-primary/60">
                 <ShieldCheck size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest italic">Encrypted Session</span>
              </div>
              <div className="flex items-center space-x-3 text-chart-4/60">
                 <Zap size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest italic">High Velocity Sync</span>
              </div>
           </div>
        </div>

        {/* Right Side: Immersive Login Form */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl glass p-10 md:p-16 rounded-[4rem] border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            
            <div className="flex justify-between items-center mb-16 relative z-10">
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Member Login</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 italic">Session Validation V1.0</p>
              </div>
              <Link href="/" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-muted-foreground hover:text-white transition-all border border-white/5">
                <ArrowLeft size={18} />
              </Link>
            </div>

            <div className="space-y-10 relative z-10">
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
                    <FaGoogle size={20} className="mr-6 text-primary" />
                    Authorize with Google
                  </>
                )}
              </Button>

              <div className="relative">
                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                 <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-[#020617] px-8 text-muted-foreground/40 font-black tracking-[0.5em] italic">Or Identity Check</span></div>
              </div>

              {/* Manual Form */}
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                 <div className="space-y-6">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 ml-4">Authorized Email</label>
                       <div className="relative group">
                          <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                          <input type="email" placeholder="COMM LINK" className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-6 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center px-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">Access Password</label>
                          <Link href="#" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest italic">Forgot Protocol?</Link>
                       </div>
                       <div className="relative group">
                          <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                          <input type="password" placeholder="••••••••" className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-14 font-black text-xs focus:ring-2 ring-primary/20 transition-all outline-none text-white uppercase tracking-widest placeholder:text-muted-foreground/20" />
                          <EyeOff size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 cursor-pointer hover:text-primary transition-colors" />
                       </div>
                    </div>
                 </div>

                 <Button className="w-full h-24 rounded-[2.5rem] luxury-gradient border-none text-white font-black text-[12px] tracking-[0.6em] uppercase italic shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500">
                    VALIDATE SESSION
                    <Sparkles size={20} className="ml-6" />
                 </Button>
              </form>

              <p className="text-center text-[10px] text-muted-foreground/40 font-black tracking-widest uppercase italic">
                New creator? <Link href="/register" className="text-primary hover:underline ml-2">Initialize Account</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
