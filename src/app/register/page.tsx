"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row-reverse">
      {/* Right Side: Branding & Info */}
      <div className="hidden lg:flex flex-1 luxury-gradient p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-chart-4/10 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 text-right">
          <Link href="/" className="inline-flex items-center space-x-2 text-white">
            <span className="text-2xl font-black tracking-tighter uppercase">Ultimate Digitizing</span>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg ml-auto text-right">
          <h1 className="text-6xl font-black text-white mb-8 leading-tight">Start Your Journey Today.</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Whether you are a buyer looking for perfection or a seller ready to conquer the market, we have the tools you need to succeed.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-end">
           <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-white max-w-xs text-right">
              <p className="font-bold mb-2">"This platform changed my business. The quality of designs is unmatched."</p>
              <p className="text-xs font-black uppercase tracking-widest opacity-60">— Alex Rivera, Fashion Designer</p>
           </div>
        </div>
      </div>

      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative">
        <Link href="/" className="absolute top-8 right-8 flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-bold lg:hidden">
          Back <ArrowLeft size={16} className="ml-2 rotate-180" />
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Create Account</h2>
            <p className="text-muted-foreground font-medium text-lg">Join the world's most elite digitizing community.</p>
          </div>

          <form className="space-y-6">
             <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                   <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="text" placeholder="John Doe" className="w-full h-14 bg-secondary/50 border-none rounded-2xl pl-12 pr-4 font-bold focus:ring-2 ring-primary/20 transition-all" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                   <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="email" placeholder="name@company.com" className="w-full h-14 bg-secondary/50 border-none rounded-2xl pl-12 pr-4 font-bold focus:ring-2 ring-primary/20 transition-all" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                   <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="password" placeholder="••••••••" className="w-full h-14 bg-secondary/50 border-none rounded-2xl pl-12 pr-4 font-bold focus:ring-2 ring-primary/20 transition-all" />
                   </div>
                </div>
             </div>

             <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-4">I want to join as a:</label>
                <div className="grid grid-cols-2 gap-4">
                   <button type="button" className="p-4 rounded-2xl border-2 border-primary bg-primary/5 text-primary flex flex-col items-center space-y-2 group transition-all">
                      <User size={24} />
                      <span className="font-bold text-sm">Buyer</span>
                   </button>
                   <button type="button" className="p-4 rounded-2xl border-2 border-border hover:border-primary/20 flex flex-col items-center space-y-2 group transition-all">
                      <Store size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors">Seller</span>
                   </button>
                </div>
             </div>

             <div className="flex items-start space-x-3 text-xs text-muted-foreground font-bold">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded-md border-border text-primary focus:ring-primary/20" />
                <p>I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
             </div>

             <Button className="w-full h-16 rounded-2xl luxury-gradient border-none text-white font-black text-lg shadow-xl shadow-primary/20">
                Create Account
             </Button>
          </form>

          <p className="text-center text-muted-foreground font-bold">
            Already have an account? <Link href="/login" className="text-primary hover:underline ml-1">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
